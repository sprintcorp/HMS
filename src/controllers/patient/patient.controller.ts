import { Body, Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/authorization.decorator';
import { PatientDTO } from 'src/dtos/patient.dto';
import { UserResponse } from 'src/dtos/userResponse.dto';
import { PatientService } from 'src/services/patient/patient.service';

@Controller('api/v1/patient')
@Public()
export class PatientController {
    constructor(private patientService: PatientService){}

    @Post('register')
    async createPatient(@Res() res, @Body() patient: PatientDTO){
        const data = await this.patientService.createPatient(patient);
        return res.status(HttpStatus.CREATED).json({data});
    }

    @Post('questions')
    @UseInterceptors(AnyFilesInterceptor())
    async attemptQuestion(@UploadedFiles() answerFile: Array<Express.Multer.File>,
     @Body() userInput: UserResponse, @Res() res){        

        const data = await this.patientService.attemptQuestion(userInput, answerFile)
        return res.status(HttpStatus.CREATED).json({data});
    }

    @Get('questions')
    async getUnattemptedQuestions(@Query() query, @Res() res){
        const data = await this.patientService.getUnattemptedQuestion(query.email)
        return res.status(HttpStatus.OK).json({data});
    }
}
