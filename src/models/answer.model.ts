import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Question } from "./question.model";

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {

    @Prop({required:true})
    answer: Types.Array<any>;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
    question: Question;

    @Prop({default: Date.now()})
    createdDate: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);