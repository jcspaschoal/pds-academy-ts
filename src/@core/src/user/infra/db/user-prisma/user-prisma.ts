import {Address as AddressPrismaModel, PrismaClient, User as UserPrismaModel, Prisma} from "@prisma/client";
import {EntityValidationError, LoadEntityError, NotFoundError, UniqueEntityId} from "#seedwork/domain";
import {hashPassword} from "../../utils";
import {Address, EmailAlreadyInUseError, Group, User, UserRepository as UserRepositoryContract} from "#user/domain";


type UserPermissions = {
    permission_names: string[], role?: string, group_id: number
}

export namespace UserPrisma {
    export class UserRepository implements UserRepositoryContract.Repository {
        sortableFields: string[] = ["first_name", "last_name", "created_at"];

        constructor(private prisma: PrismaClient) {
        }

        async search(props: UserRepositoryContract.SearchParams): Promise<UserRepositoryContract.SearchResult> {
            throw new Error("Method not implemented.");
        }

        async getStatistics() {
        return
        }

        async insert(entity: User): Promise<void> {
            const existingUser = await this._findByEmail(entity.email);

            if (existingUser) {
                throw new EmailAlreadyInUseError();
            }
            await this.prisma.user.create({
                data: {
                    id_user: entity.id,
                    first_name: entity.first_name,
                    last_name: entity.last_name,
                    email: entity.email,
                    password: await hashPassword(entity.password),
                    created_at: entity.created_at,
                    status: entity.props.status,
                    group_id: entity.props.group.value.type,
                },
            });
        }

        async bulkInsert(entities: User[]): Promise<void> {
            throw new Error("Method not implemented.");
        }

        async findById(id: string | UniqueEntityId): Promise<User> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            try {
                const existingUser = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        id_user: idValue
                    }
                })
                const permissions: UserPermissions = {
                    group_id: existingUser.group_id, permission_names: []
                }

                return UserModelMapper.toEntity(existingUser, permissions);

            } catch (error) {
                // User not found, handle the error
                throw new NotFoundError(`Failed to find user`);
            }
        }

        async findByEmail(email: string): Promise<User> {
            try {
                const existingUser = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        email: email
                    }, include: {
                        group: {
                            select: {
                                GroupHasPermission: {
                                    include: {
                                        permission: true,
                                    },
                                },
                            }
                        },
                    },
                })


                const permissions: UserPermissions = {
                    group_id: existingUser.group_id,
                    permission_names: existingUser.group?.GroupHasPermission?.map(permission => permission.permission.name) || []
                }

                return UserModelMapper.toEntity(existingUser, permissions);

            } catch (error) {
                // User not found, handle the error
                throw new NotFoundError(`Failed to find user`);
            }
        }

        async _findByEmail(email: string): Promise<UserPrismaModel> {
            return this.prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
        }

        async findAll(): Promise<User[]> {
            throw new Error("Method not implemented.");
        }

        async update(entity: User): Promise<void> {
            const user = await this.prisma.user.update({
                where: {
                    id_user: entity.id,

                }, include: {
                    address: true
                }, data: {
                    first_name: entity.first_name,
                    last_name: entity.last_name,
                    password: await hashPassword(entity.password),
                    status: entity.status,
                },
            });
        }

        async updateAddress(entity: User): Promise<void> {
            const address = await this.prisma.address.update({
                where: {
                    user_id: entity.id,

                }, data: {
                    street: entity.address.value.street,
                    number: entity.address.value.number,
                    description: entity.address.value.description,
                    postal_code: entity.address.value.postal_code,
                }
            });
        }

        async addAddress(entity: User): Promise<void> {
            const address = await this.prisma.address.upsert({
                where: {
                    user_id: entity.id
                }, create: {
                    street: entity.address.value.street,
                    number: entity.address.value.number,
                    description: entity.address.value.description,
                    postal_code: entity.address.value.postal_code,
                    user_id: entity.id
                }, update: {
                    street: entity.address.value.street,
                    number: entity.address.value.number,
                    description: entity.address.value.description,
                    postal_code: entity.address.value.postal_code,
                    user_id: entity.id
                }
            });
        }

        async delete(id: string | UniqueEntityId): Promise<void> {
            throw new Error("Method not implemented.");
        }

        async deleteAddress(id: string | UniqueEntityId): Promise<void> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;

            await this.prisma.address.delete({
                where: {
                    user_id: idValue
                }
            })
        }

        async getAddress(id: string | UniqueEntityId): Promise<User> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;

            const existingAddress = await this.prisma.address.findFirst({
                where: {
                    user_id: idValue
                }, include: {
                    user: true
                }
            })

            if (!existingAddress) {
                throw new NotFoundError("Address does not exists")
            }

            const existingUser = existingAddress?.user || undefined

            return UserModelMapper.toEntity(existingUser, undefined, existingAddress)

        }
    }

    export class UserModelMapper {
        static toEntity(model: UserPrismaModel, userPermissions?: UserPermissions, addressModel?: AddressPrismaModel) {
            try {

                const {id_user, ...otherData} = model;
                const userData: any = {...otherData};

                if (userPermissions) {
                    userData.group = new Group({
                        type: userPermissions.group_id, permissions: userPermissions.permission_names
                    });
                }

                if (addressModel) {
                    const {id_address, ...addressData} = addressModel;
                    userData.address = new Address(addressData);
                }

                return new User(userData, new UniqueEntityId(id_user));
            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }
    }

}
