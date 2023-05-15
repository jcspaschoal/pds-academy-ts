import {Entity, EntityValidationError, UniqueEntityId} from "#seedwork/domain";
import {Description, LessonValidatorFactory, LessonValidatorsTypes, Video} from "#course/domain";


export type LessonProps = {
    name: string;
    moduleId: string;
    order: number;
    video?: Video;
    description?: Description;
    createdAt?: Date;
}

export type LessonPropsUpdate = {
    name?: string;
    order?: number;
    video?: Video;
    description?: Description;
}

export class Lesson extends Entity<LessonProps> {

    constructor(public readonly props: LessonProps, id?: UniqueEntityId) {
        super(props, id);
        this.validate(props, 'create')
        this.props.createdAt = this.props.createdAt ?? new Date();
        this.props.description = this.props.description ?? null;
        this.props.video = this.props.video ?? null;
        this.order = this.props.order
        this.name = this.props.name
    }

    get order() {
        return this.props.order
    }

    private set order(number: number) {
        this.props.order = number
    }

    get name() {
        return this.props.name
    }

    private set name(value: string) {
        this.props.name = value
    }

    public update(props: LessonPropsUpdate) {
        this.name = props.name ?? this.props.name;
        this.order = props.order ?? this.props.order;
        this.props.video = props.video ?? this.props.video
        this.props.description = props.description ?? this.props.description
    }

    private validate(props: LessonProps | LessonPropsUpdate, validatorType: LessonValidatorsTypes) {
        const validator = LessonValidatorFactory.create(validatorType)
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }


}