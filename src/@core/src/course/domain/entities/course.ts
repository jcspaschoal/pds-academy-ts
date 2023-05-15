import {Entity, EntityValidationError, UniqueEntityId} from "#seedwork/domain";
import {Category, CourseModule, Description} from "#course/domain";
import {CourseValidatorFactory, CourseValidatorsTypes} from "../validators";


export type CourseProps = {
    name: string;
    description?: Description;
    userId: string;
    minScore?: number;
    createdAt?: Date;
    courseModules?: CourseModule[]
    Categories?: Category[]
}

export type CourseUpdateProps = {
    name?: string;
    description?: Description;
    minScore?: number;
}

export class Course extends Entity<CourseProps> {

    constructor(public readonly props: CourseProps, id?: UniqueEntityId) {
        super(props, id);
        this.validate(props, 'create')
        this.props.createdAt = this.props.createdAt ?? new Date()
        this.props.description = this.props.description ?? null
        this.minScore = this.props.minScore ?? null
        this.name = this.props.name

    }

    public get minScore() {
        return this.props.minScore
    }

    private set minScore(score: number) {
        this.props.minScore = score
    }

    get name() {
        return this.props.name
    }

    private set name(value: string) {
        this.props.name = value
    }

    public getDescription() {
        return this.props.description
    }

    public canJoin(userScore: number): boolean {
        return !this.minScore || userScore >= this.minScore;
    }

    update(props: CourseUpdateProps) {
        this.validate(props, 'update')
        this.props.description = props.description ?? this.props.description
        this.name = props.name ?? this.props.name
        this.props.minScore = props.minScore ?? this.props.minScore
    }

    private validate(props: CourseProps | CourseUpdateProps, validatorType: CourseValidatorsTypes) {
        const validator = CourseValidatorFactory.create(validatorType)
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }

}