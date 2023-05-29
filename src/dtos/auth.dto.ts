import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength, NotEquals } from "class-validator";
import { ObjectId } from "mongoose";
import { UserRoles } from "src/constants/roles.constant";
import { EmailNotRegistered } from "src/decorators/validation.decorator";

export class AuthDTO{

    public _id: ObjectId;

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
    @EmailNotRegistered({ message: 'email already exist' })
    public email: string;

    @IsNotEmpty()
    @MinLength(6)
    public password: string;

    @IsNotEmpty()
    @IsEnum(UserRoles)
    @NotEquals(UserRoles.ADMIN)
    public role: UserRoles;
}

export class LoginDTO{
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @MinLength(6)
    public password: string;
}

export class StaffUpdateDTO{

    @MaxLength(50)
    @MinLength(0)
    @IsOptional()
    public firstname: string;
  
    @MaxLength(50)
    @MinLength(0)
    @IsOptional()
    public lastname: string;

    @IsOptional()
    @IsEmail()
    @EmailNotRegistered({ message: 'email already exist' })
    public email: string;

    @IsOptional()
    @MinLength(6)
    public password: string;

    @IsOptional()
    @IsEnum(UserRoles)
    @NotEquals(UserRoles.ADMIN)
    public role: UserRoles;
}