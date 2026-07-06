import { isAlphanumeric, IsEnum, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { userTypes } from "../schema/user.schema";
import { Types } from "mongoose";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    username:string

    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    //@Matches(/^(?=.*[0-9]/),{message: ''})
    password:string

    @IsString()
    @IsNotEmpty()
    @IsEnum(userTypes)
    userType:userTypes

        
    @IsString()
    @IsNotEmpty()
    storeID:string
    
}