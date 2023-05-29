import { InjectModel } from '@nestjs/mongoose';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import { Model } from 'mongoose';
import { AuthDTO } from 'src/dtos/auth.dto';
import { PatientDTO } from 'src/dtos/patient.dto';
import { Patient } from 'src/models/patient.model';
import { User } from 'src/models/user.model';

  @ValidatorConstraint({ async: true })
  export class IsEmailNotRegistered implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private userModel: Model<AuthDTO>) {}
  
    async validate(email: any) {
        
    const user = await this.userModel.findOne({email:email});
    return user === null;
    }
  }
  
  export function EmailNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailNotRegistered,
      });
    };
  }

  @ValidatorConstraint({ async: true })
  export class IsPatientEmailNotRegistered implements ValidatorConstraintInterface {
    constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDTO>) {}
  
    async validate(email: any) {
        
    const user = await this.patientModel.findOne({email:email});
    return user === null;
    }
  }
  
  export function PatientEmailNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsPatientEmailNotRegistered,
      });
    };
  }
  