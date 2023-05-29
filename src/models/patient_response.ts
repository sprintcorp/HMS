import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Patient } from "./patient.model";
import { Question } from "./question.model";

export type PatientResponseDocument = PatientResponse & Document;

@Schema()
export class PatientResponse {

    @Prop({required:true})
    answer: Types.Array<any>;

    @Prop({required:true})
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
    question: Question;

    @Prop({ type: mongoose.Schema.Types.String, ref: 'Patient' })
    patient: Patient;

    @Prop({default: Date.now()})
    createdDate: Date;
}

export const PatientResponseSchema = SchemaFactory.createForClass(PatientResponse);