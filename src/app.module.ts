import { Module } from '@nestjs/common';
import { ConfigsModule } from './modules/configs/configs.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { PatientModule } from './modules/patient/patient.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    CloudinaryModule,
    ConfigsModule,
    AuthModule,
    AdminModule,
    PatientModule,
    DoctorModule,
  ],
  // controllers: [AuthController, AdminController, DoctorController, PatientController],
  providers: [],
})
export class AppModule {}
