import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type QuestionDocument = Question & Document;

@Schema({toJSON: {virtuals: true}})
export class Question {

    @Prop({required:true})
    question: string;

    @Prop({required:true})
    type: string;

    @Prop({default: Date.now()})
    createdDate: Date;
}

const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.virtual('answer', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'question',
    justOne: false,
});

QuestionSchema.virtual('feedback', {
    ref: 'PatientResponse',
    localField: '_id',
    foreignField: 'question',
    justOne: false,
});

export {QuestionSchema};