import { IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";
import { QuestionType } from "src/constants/questionType";

export class QuestionCreateDTO{

    @MaxLength(500)
    @MinLength(0)
    @IsNotEmpty()
    public question: string;
  
    @IsEnum(QuestionType)
    @IsNotEmpty()
    public type: QuestionType;

    @IsOptional()
    public answer: Types.Array<any>;
}

export class QuestionUpdateDTO{

    @MaxLength(500)
    @MinLength(0)
    @IsOptional()
    public question: string;
  
    @IsEnum(QuestionType)
    @IsOptional()
    public type: QuestionType;

    @IsOptional()
    public answer: Types.Array<any>;
}