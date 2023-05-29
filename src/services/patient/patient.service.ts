import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PatientDTO } from 'src/dtos/patient.dto';
import { UserResponse } from 'src/dtos/userResponse.dto';
import { Patient } from 'src/models/patient.model';
import { PatientResponse } from 'src/models/patient_response';
import { Question } from 'src/models/question.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Config } from 'src/models/config.model';
import { PublishQuestionEvent } from 'src/events/publishQuestion.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PatientService {

    private readonly logger = new Logger(PatientService.name);

    constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDTO>,
    @InjectModel(PatientResponse.name) private patientResponseModel: Model<PatientResponse>,
    @InjectModel(Config.name) private configModel: Model<Config>,
    @InjectModel(Question.name) private questionModel:Model<Question>, 
    private cloudinary: CloudinaryService, private eventEmitter: EventEmitter2){}


    @Cron('0 0 * * * *')
    async handleCron() {
        const interval = await this.configModel.findOne();
        if (interval) {
            const cronExpression = `0 */${interval?.notificationInterval} * * * *`;


            const patients = await this.patientModel.aggregate([{
                $lookup: {
                  from: 'patientresponses',
                  localField: 'email',
                  foreignField: 'patient',
                  as: 'feedback',
                },
              },
              {
                $match: {
                    feedback: { $size: 0 },
                },
              },{
                $project: {
                  _id: 0,
                  email: 1,
                },
              },]);
             
             const patientEmail = patients.map(object => object.email);
             this.eventEmitter.emit('publish_question_notification', new PublishQuestionEvent(patientEmail.join(', ')));

            this.logger.log(`Cron job executed at time: ${interval?.notificationInterval}`);
            this.logger.log(`Cron expression: ${cronExpression}`);
        }
    }

    async createPatient(patient: PatientDTO){
        try{

            const data = await new this.patientModel(patient).save();
            return data;

        }catch(e){
            throw e;
        }
    }

    async getUnattemptedQuestion(email: string){
        const questions = await this.questionModel.find().populate('answer')
        return questions;

    }

    async attemptQuestion(userInput: UserResponse, files: any){
        try{

            let urls = [];
            let i = 0;

            for (const file of files) {    
                const fileData = await this.cloudinary.uploadFile(file)
                urls.push(fileData?.secure_url);
            }

            userInput.question.forEach(async(e: any, index: number) => {
                if(userInput.type[index] == 'file'){
                    if(index != userInput.answer.length){
                        userInput.answer[index + 1] = userInput.answer[index];
                    }
                    userInput.answer[index] = urls[i];
                    i++;
                }

                const data = {'question':userInput.question[index],'answer':userInput.answer[index]
                ,'patient':userInput.patient, 'type':userInput.type[index]};

                await new this.patientResponseModel(data).save();
            });

            return "Feedback saved successfully";
        }catch(e){
            throw e
        }
    }
}
