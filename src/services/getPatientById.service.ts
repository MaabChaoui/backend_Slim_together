import { Patient } from "../entities/Patient.entity";


export default async function getPatientById(id:number) {
    return await Patient.findOneBy({id})
}