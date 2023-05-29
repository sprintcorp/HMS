import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { PatientEmailNotRegistered } from "src/decorators/validation.decorator";

export class PatientDTO{
    @MaxLength(50)
    @MinLength(0)
    @IsNotEmpty()
    public firstname: string;
  
    @MaxLength(50)
    @MinLength(0)
    @IsNotEmpty()
    public lastname: string;

    @IsNotEmpty()
    @IsEmail()
    @PatientEmailNotRegistered({ message: 'email already exist' })
    public email: string;
}