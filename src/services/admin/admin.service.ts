import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuthDTO, StaffUpdateDTO } from 'src/dtos/auth.dto';
import { AccountCreationEvent } from 'src/events/accountCreation.event';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { QuestionCreateDTO, QuestionUpdateDTO } from 'src/dtos/question.dto';
import { PatientDTO } from 'src/dtos/patient.dto';
import { Patient } from 'src/models/patient.model';
import { PublishQuestionEvent } from 'src/events/publishQuestion.event';
import { PatientResponse } from 'src/models/patient_response';
import { Config } from 'src/models/config.model';
import { UserResources } from 'src/responses/auth.response';

@Injectable()
export class AdminService {

    constructor(@InjectModel(User.name) private authModel: Model<AuthDTO>,
    @InjectModel(Question.name) private questionModel:Model<Question>,
    @InjectModel(Answer.name) private answerModel:Model<Answer>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDTO>,
    @InjectModel(PatientResponse.name) private patientResponseModel: Model<PatientResponse>,
    @InjectModel(Config.name) private configModel: Model<Config>,
     private eventEmitter: EventEmitter2, private mailService: MailerService){}

    async createStaff(user: AuthDTO){
        try{
            const userData = await new this.authModel(user).save();
            this.eventEmitter.emit('welcome_mail_notification', new AccountCreationEvent(user));
            return UserResources.response(userData);
        }catch(e){
            throw e;
        }
    }


    async updateStaff(user: StaffUpdateDTO, id:ObjectId){
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const userData = await this.authModel.findByIdAndUpdate(id, user, {new:true});
        return UserResources.response(userData);
    }


    async getStaffs(filter){
        const page = filter.page ? parseInt(filter.page) : 1;
        const limit = filter.limit ? parseInt(filter.limit) : 10;

        try{
            const staffs = await this.authModel.find().limit(limit * 1)
            .skip((page - 1) * limit).sort({ createdAt: -1 });
            const count = await this.authModel.countDocuments();

            const data = UserResources.responses(staffs); 
            return {
                data,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalStaffs: count
            };
        }catch(e){
            throw e;
        }
    }

    async getStaff(id: ObjectId){
        try{
        const staff = await this.authModel.findById(id);
        return UserResources.response(staff)
        }catch(e){
            throw e;
        }
    }

    async deleteStaff(id: ObjectId){
        try{
        const staff = await this.authModel.findOneAndDelete({id:id,role:'doctor'});
        return "Staff deleted successfully"
        }catch(e){
            throw e;
        }
    }

    async createQuestion(question: QuestionCreateDTO){
        try{
            if(question.type != 'user_input' && question.type != 'file' && !question.answer){
                throw new HttpException(`Answer is required for ${question.type} type`, HttpStatus.NOT_ACCEPTABLE);
            }

            const answer = question.answer;
            delete question['answer'];

            const saveQuestion =  await new this.questionModel(question).save();


            if(question.type != 'user_input' && question.type != 'file'){
                await new this.answerModel({answer:answer, question: saveQuestion._id}).save();
            }
            return saveQuestion;
        }catch(e){
            throw e;
        }
    }

    async updateQuestion(question: QuestionUpdateDTO, id: ObjectId){
        try{
            const answer = question.answer;
            delete question['answer'];
            
            const data = await this.questionModel.findByIdAndUpdate(id, question, {new:true});

            if(question.type != 'user_input' && question.type != 'file'){
                await this.answerModel.findOneAndUpdate({question:id},{answer:answer});
            }
            return data;
        }catch(e){
            throw e;
        }
    }

    async getQuestions(){
        try{
            const data = await this.questionModel.find().populate('answer');
            return data;
        }catch(e){
            throw e;
        }
    }

    async deleteQuestion(id: ObjectId){
        try{
            await this.questionModel.findByIdAndDelete(id);
            return "question deleted successfully";
        }catch(e){
            throw e;
        }
    }

    async publishQuestion(){
        try{
            const patients = await this.patientModel.find().select('email -_id');
            const patientEmail = patients.map(object => object.email);
            this.eventEmitter.emit('publish_question_notification', new PublishQuestionEvent(patientEmail.join(', ')));
            return "Question published successfully"
        }catch(e){
            throw e;
        }
    }

    async getPatientFeedback(email){
        try{
            const patients = this.patientResponseModel.aggregate([
                {
                  $match: {
                    patient: email,
                  },
                },
                {
                  $lookup: {
                    from: 'questions', 
                    localField: 'question',
                    foreignField: '_id',
                    as: 'question',
                  },
                },
              ]);
            return patients;
        }catch(e){
            throw e;
        }
    }

    async getPatientWithFeedback(){
        try{
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
                    feedback: { $ne: [] },
                },
              },{
                $project: {
                  _id: 1,
                  email: 1,
                  firstname: 1,
                  lastname: 1,
                },
              },]);
             return patients;
        }catch(e){
            throw e;
        }
    }

    async getPatientWithoutFeedback(){
        try{
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
             return patientEmail;
        }catch(e){
            throw e;
        }
    }

    async updateInterval(req: { notificationInterval: number; }){
        try{
            await this.configModel.findOneAndUpdate({}, req, { upsert: true, new: true })
            return "Configuration saved"
        }catch(e){
            throw e;
        }
    }

}
