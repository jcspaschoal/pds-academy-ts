import { PrismaClient, User as UserPrismaModel } from "@prisma/client";
import {
  User,
  UserRepository as UserRepositoryContract,
} from "../../../domain";
import {
  EntityValidationError,
  LoadEntityError,
  UniqueEntityId,
} from "../../../../@seedwork/domain";
import { EmailAlreadyInUseError } from "../../../domain/errors";
import { hashPassword } from "../../utils";
import { where } from "sequelize";

export namespace UserPrisma {
  export class UserRepository implements UserRepositoryContract.Repository {
    sortableFields: string[] = ["first_name", "last_name", "created_at"];

    constructor(private prisma: PrismaClient) {}

    async search(
      props: UserRepositoryContract.SearchParams
    ): Promise<UserRepositoryContract.SearchResult> {
      throw new Error("Method not implemented.");
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
          group_id: entity.props.group,
        },
      });
    }

    async bulkInsert(entities: User[]): Promise<void> {
      throw new Error("Method not implemented.");
    }
    async findById(id: string | UniqueEntityId): Promise<User> {
      const idValue = id instanceof UniqueEntityId ? id.id : id;
      const existingUser = await this.prisma.user.findFirst({
        where: {
          id_user: idValue,
        },
      });
      return UserModelMapper.toEntity(existingUser);
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
      this.prisma.user.update({
        where: {
          id_user: entity.id,
        },
        data: {
          first_name: entity.first_name,
          last_name: entity.last_name,
          password: await hashPassword(entity.password),
        },
      });
    }
    async delete(id: string | UniqueEntityId): Promise<void> {
      throw new Error("Method not implemented.");
    }
  }
}

export class UserModelMapper {
  static toEntity(model: UserPrismaModel) {
    const { id_user, ...otherData } = model;
    try {
      return new User(otherData, new UniqueEntityId(id_user));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
