import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import {EntityValidationError} from "../../../@seedwork/domain/errors/validation-error";
import Entity from "../../../@seedwork/domain/entity/entity";
import {UserValidatorFactory, UserValidatorTypes,} from "../validators/user.validator";
import {Group, GroupTypes, Address, AddressProperties} from "../value-objects";


export type UserProperties = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    status?: boolean;
    address?: Address
    group?: Group;
    created_at?: Date;
};

export type UserUpdateProperties = {
    first_name?: string;
    last_name?: string;
    password?: string;
};


export class User extends Entity<UserProperties> {
    constructor(public readonly props: UserProperties, id?: UniqueEntityId) {
        super(props, id);
        User.validate(props);
        this.props.status = this.props.status ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
        this.props.group = this.props.group ?? new Group({type : GroupTypes.Student});
        this.props.address = this.props.address ?? undefined;


        this.first_name = this.props.first_name;
        this.last_name = this.props.last_name;
        this.email = this.props.email;
        this.password = this.props.password;
    }

    update({first_name, last_name, password}: UserUpdateProperties) {
        User.validate({first_name, last_name, password}, "update");
        this.first_name = first_name ?? this.first_name;
        this.last_name = last_name ?? this.last_name;
        this.password = password ?? this.password;
    }

    get first_name() {
        return this.props.first_name;
    }

    private set first_name(value: string) {
        this.props.first_name = value;
    }

    get address(){
        return this.props.address
    }

     change_address(address: Address) {
        this.props.address = address
    }

    get last_name() {
        return this.props.last_name;
    }

    private set last_name(value: string) {
        this.props.last_name = value;
    }

    get email() {
        return this.props.email;
    }

    private set email(value: string) {
        this.props.email = value;
    }

    get password() {
        return this.props.password;
    }

    private set password(value: string) {
        this.props.password = value;
    }

    activate() {
        this.props.status = true;
    }

    deactivate() {
        this.props.status = false;
    }

    private set is_active(value: boolean) {
        this.props.status = value ?? true;
    }

    get get_group() {
        return this.props.group;
    }

    get status() {
        return this.props.status
    }

    get created_at() {
        return this.props.created_at;
    }


    private static validate<T>(
        props: T,
        validator: UserValidatorTypes = "base"
    ) {
        const classValidator = UserValidatorFactory.create(validator);
        const isValid = classValidator.validate(props);

        if (!isValid) {
            throw new EntityValidationError(classValidator.errors);
        }
    }
}
