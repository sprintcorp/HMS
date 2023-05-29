import { Types } from "mongoose";
import { PatientDTO } from "src/dtos/patient.dto";

export class PublishQuestionEvent {
    constructor(public readonly user: string) {}
}