import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { ObjectId, Types } from "mongoose";
import { QuestionType } from "src/constants/questionType";

export class UserResponse{
    @IsNotEmpty()
    public answer: Types.Array<any>;

    // @IsEnum(QuestionType)
    @IsNotEmpty()
    public type: Types.Array<any>;

    @IsNotEmpty()
    public question: Types.Array<ObjectId>;

    @IsEmail()
    public patient: string;

}