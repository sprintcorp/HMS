import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {

    @Prop({required:true})
    firstname: string;

    @Prop({required:true})
    lastname: string;

    @Prop({unique:true, required:true})
    email: string;

    @Prop({default: Date.now()})
    createdDate: Date;
}

const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.virtual('feedback', {
    ref: 'PatientResponse',
    localField: '_id',
    foreignField: 'patient',
    justOne: false,
});

export {PatientSchema}