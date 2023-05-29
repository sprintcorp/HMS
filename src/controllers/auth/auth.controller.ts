import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Public } from 'src/decorators/authorization.decorator';
import { AuthDTO, LoginDTO } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('api/v1/')
@Public()
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('staff-signup')
    async staffRegistration(@Res() res, @Body() req: AuthDTO){
        const data = await this.authService.createStaff(req);
        return res.status(HttpStatus.CREATED).json({data});
    }

    @Post('staff-signin')
    async staffLogin(@Res() res, @Body() req: LoginDTO){
        const data = await this.authService.staffLogin(req);
        return res.status(HttpStatus.OK).json(data);
    }
}
