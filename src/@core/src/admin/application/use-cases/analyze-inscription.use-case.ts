import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {AdminRepository} from "#admin/domain";
import {Document, InscriptionRepository, InscriptionStatus, Status} from "#inscription/domain";


export namespace AnalyzeInscriptionUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private readonly adminRepository: AdminRepository.Repository, private readonly inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const inscription = await this.inscriptionRepository.findById(input.inscriptionId)

            if (input.status) {
                inscription.changeStatusToApproved()
            } else {
                inscription.changeStatusToDenied()
            }
            await this.inscriptionRepository.update(inscription)
            this.adminRepository.createInscriptionEntry(input.userId, input.inscriptionId)
        }
    }

    export type Input = {
        userId: string, inscriptionId: string; status: boolean;
    };

    export type Output = void;
}