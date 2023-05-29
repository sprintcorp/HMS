import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { IsEmailNotRegistered } from 'src/decorators/validation.decorator';
import { AuthGuard } from 'src/middlewares/authentication.middleware';
import { User, UserSchema } from 'src/models/user.model';
import { AuthService } from 'src/services/auth/auth.service';

@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
              name: User.name,
              useFactory: () => {
                UserSchema.pre('save', async function(next: any) {
                    const salt = await bcrypt.genSalt();
                    const hashedPassword = await bcrypt.hash(this.password, salt);
                    this.password = hashedPassword;
                    next();
                });
              },
            },
        ]),

        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
    ],
    controllers: [AuthController],
    providers: [ AuthService,  IsEmailNotRegistered, {
        provide: APP_GUARD,
        useClass: AuthGuard,
      }]
})
export class AuthModule {}
