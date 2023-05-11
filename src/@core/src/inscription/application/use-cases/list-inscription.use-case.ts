import {PaginationOutputDto, PaginationOutputMapper, SearchInputDto} from "#seedwork/application";
import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionOutputDto, InscriptionOutputMapper} from "../dto";
import {InscriptionRepository} from "#inscription/domain";

export namespace ListInscriptionUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const params = new InscriptionRepository.SearchParams(input)
            const searchResult = await this.inscriptionRepository.search(params)
            return this.toOutput(searchResult)

        }

        private toOutput(searchResult: InscriptionRepository.SearchResult): Output {
            const items = searchResult.items.map((item) => {
                return InscriptionOutputMapper.toOutput(item)
            })
            return PaginationOutputMapper.toOutput(items, searchResult)
        }

    }

    export type Input = SearchInputDto;


    export type Output = PaginationOutputDto<InscriptionOutputDto>;
}

export default ListInscriptionUseCase;
