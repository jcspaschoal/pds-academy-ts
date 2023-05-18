import {Entity, EntityValidationError, UniqueEntityId} from "#seedwork/domain";
import {CourseModuleValidatorFactory, CourseModuleValidatorsTypes, Description, Lesson} from "#course/domain";


export type CourseModuleProps = {
    courseId: string
    name: string;
    order: number;
    description?: Description;
    createdAt?: Date;
    lessons?: Lesson[]
}

export type CourseModuleUpdateProps = {
    name?: string;
    order?: number
    description?: Description
}


export class CourseModule extends Entity<CourseModuleProps> {

    constructor(public readonly props: CourseModuleProps, id?: UniqueEntityId) {
        super(props, id);
        this.validate(props, 'create')
        this.props.createdAt = props.createdAt ?? new Date()
        this.description = this.props.description ?? null
        this.order = this.props.order
        this.name = this.props.name
    }

    get description() {
        return this.props.description
    }

    public set description(description: Description) {
        this.props.description = description
    }

    get name() {
        return this.props.name
    }

    private set name(name: string) {
        this.props.name = name
    }

    get order() {
        return this.props.order
    }

    private set order(number: number) {
        this.props.order = number
    }

    public update(props: CourseModuleUpdateProps) {
        this.validate(props, 'update')
        this.order = props.order ?? this.props.order
        this.name = props.name ?? this.props.name
        this.props.description = props.description ?? this.props.description
    }

    private validate(props: CourseModuleProps | CourseModuleUpdateProps, validatorType: CourseModuleValidatorsTypes) {
        const validator = CourseModuleValidatorFactory.create(validatorType)
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }

}