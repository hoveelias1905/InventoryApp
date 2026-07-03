import { isAlphanumeric, IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { userTypes } from "../schema/user.schema";
import { Types } from "mongoose";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    username:string

    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    password:string

    @IsString()
    @IsNotEmpty()
    @IsEnum(userTypes)
    userType:userTypes

        
    @IsString()
    @IsNotEmpty()
    storeID:Types.ObjectId
    
}