import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDTO, LoginDTO } from 'src/dtos/auth.dto';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { UserResources } from 'src/responses/auth.response';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private authModel: Model<AuthDTO>, private jwtService: JwtService){}

    async createStaff(user: AuthDTO){
        try{
            const newUser = new this.authModel(user).save();
            return newUser
        }catch(e){
            throw e;
        }
    }

    async createAdmin(){

    }

    async staffLogin(user: LoginDTO){
        const foundUser = await this.authModel.findOne({email:user.email})
        if(!foundUser){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)   
        }

        const { password } = foundUser;
            if (await bcrypt.compare(user.password, password)) {
              const token = await this.jwtService.signAsync({ email: foundUser.email });
              return {
                'token': token,
                'data': UserResources.response(foundUser)
              };
            }
        throw new HttpException("Incorrect username or password", HttpStatus.UNAUTHORIZED)
    }

    async mailExist(email): Promise<AuthDTO> {
        return await this.authModel.findOne({ email });
    }
}
