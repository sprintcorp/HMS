import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from 'src/controllers/admin/admin.controller';
import { MailListerner } from 'src/listeners/mail.listener';
import { AuthGuard } from 'src/middlewares/authentication.middleware';
import { Answer, AnswerSchema } from 'src/models/answer.model';
import { Config, ConfigSchema } from 'src/models/config.model';
import { Patient, PatientSchema } from 'src/models/patient.model';
import { PatientResponse, PatientResponseSchema } from 'src/models/patient_response';
import { Question, QuestionSchema } from 'src/models/question.model';
import { User, UserSchema } from 'src/models/user.model';
import { AdminService } from 'src/services/admin/admin.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema }
        ]),
        MongooseModule.forFeature([
            { name: Answer.name, schema: AnswerSchema }
        ]),
        MongooseModule.forFeature([
            { name: Patient.name, schema: PatientSchema }
        ]),
        MongooseModule.forFeature([
            { name: PatientResponse.name, schema: PatientResponseSchema }
        ]),
        MongooseModule.forFeature([
            { name: Config.name, schema: ConfigSchema }
        ]),
    ],
    controllers:[AdminController],
    providers:[AdminService, MailListerner, {
        provide: APP_GUARD,
        useClass: AuthGuard,
      }]
})
export class AdminModule {}
