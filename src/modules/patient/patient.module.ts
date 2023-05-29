import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientController } from 'src/controllers/patient/patient.controller';
import { Question, QuestionSchema } from 'src/models/question.model';
import { Patient, PatientSchema } from 'src/models/patient.model';
import { PatientService } from 'src/services/patient/patient.service';
import { IsPatientEmailNotRegistered } from 'src/decorators/validation.decorator';
import { PatientResponse, PatientResponseSchema } from 'src/models/patient_response';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Config, ConfigSchema } from 'src/models/config.model';

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: Patient.name, schema: PatientSchema }
        ]),
        MongooseModule.forFeature([
            { name: PatientResponse.name, schema: PatientResponseSchema }
        ]),
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema }
        ]),
        MongooseModule.forFeature([
            { name: Config.name, schema: ConfigSchema }
        ]),
    ],
    controllers:[PatientController],
    providers:[PatientService, IsPatientEmailNotRegistered, CloudinaryService]
})
export class PatientModule {}
