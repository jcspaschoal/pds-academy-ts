import {InscriptionStatus, Status} from "#inscription/domain";


export type InscriptionUpdateDto = {
    id: string;
    status: boolean
}


export type InscriptionUpdateOutputDto = {
    errors: any[]
    successful: Number
}