import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { AuthDTO, StaffUpdateDTO } from 'src/dtos/auth.dto';
import { QuestionCreateDTO, QuestionUpdateDTO } from 'src/dtos/question.dto';
import { AdminService } from 'src/services/admin/admin.service';

@Controller('api/v1/admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Post('staff')
    async createStaff(@Res() res, @Body() req: AuthDTO){
        const data = await this.adminService.createStaff(req);
        return res.status(HttpStatus.CREATED).json({data});
    }

    @Put('staff/:id')
    async updateStaff(@Param('id') id, @Res() res, @Body() req: StaffUpdateDTO){
        const data = await this.adminService.updateStaff(req, id);
        return res.status(HttpStatus.OK).json({data});
    }

    @Get('staffs')
    async getStaffs(@Res() res, @Query() params: any){
        const data = await this.adminService.getStaffs(params)
        return res.status(HttpStatus.OK).json(data);
    }

    @Get('staff/:id')
    async getStaff(@Res() res, @Param('id') id){
        const data = await this.adminService.getStaff(id)
        return res.status(HttpStatus.OK).json({data});
    }

    @Delete('staff/:id')
    async deleteStaff(@Res() res, @Param('id') id){
        const data = await this.adminService.deleteStaff(id)
        return res.status(HttpStatus.OK).json({data});
    }

    @Post('question')
    async createQuestion(@Res() res, @Body() question: QuestionCreateDTO){
        const data = await this.adminService.createQuestion(question);
        return res.status(HttpStatus.CREATED).json({data});
    }

    @Put('question/:id')
    async updateQuestion(@Param('id') id, @Res() res, @Body() req: QuestionUpdateDTO){
        const data = await this.adminService.updateQuestion(req, id);
        return res.status(HttpStatus.OK).json({data});
    }

    @Get('questions')
    async getQuestions(@Res() res){
        const data = await this.adminService.getQuestions()
        return res.status(HttpStatus.OK).json(data);
    }

    @Post('publish-question')
    async publishQuestion(@Res() res){
        const data = await this.adminService.publishQuestion()
        return res.status(HttpStatus.CREATED).json({data});
    }

    @Get('patient-feedback')
    async getPatientFeedback(@Res() res, @Query() query){
        const data = await this.adminService.getPatientFeedback(query.patient)
        return res.status(HttpStatus.OK).json({data});
    }

    @Get('patient-with-feedback')
    async getPatientWithFeedback(@Res() res){
        const data = await this.adminService.getPatientWithFeedback()
        return res.status(HttpStatus.OK).json({data});
    }

    @Get('patient-without-feedback')
    async getPatientWithoutFeedback(@Res() res){
        const data = await this.adminService.getPatientWithoutFeedback()
        return res.status(HttpStatus.OK).json({data});
    }

    @Post('update-notification-interval')
    async updateNotificationInterval(@Res() res, @Body() req:{notificationInterval:number}){
        const data = await this.adminService.updateInterval(req)
        return res.status(HttpStatus.OK).json({data});
    }
}
