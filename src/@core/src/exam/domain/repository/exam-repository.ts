import {
    BasicSearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult, UniqueEntityId,
} from "#seedwork/domain";
import {Admin} from "#admin/domain";
import {Exam} from "../entities";
import {UserExam} from "../value-objects";


export namespace ExamRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Admin, Filter> {
    }

    export interface Repository extends BasicSearchableRepositoryInterface<Admin, Filter, SearchParams, SearchResult> {
        getRandomExam(): Promise<Exam>
        submitUserExam(userExam: UserExam): Promise<void>
        getExamByExamUUID(examUUID: string | UniqueEntityId): Promise<Exam>
        getLastUserExam(userId: string | UniqueEntityId): Promise<UserExam>
    }

}