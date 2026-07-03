import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { userTypes } from "../schema/user.schema";
import { Types } from "mongoose";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    username:string

    
    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    @IsEnum(userTypes)
    userType:userTypes

        
    @IsString()
    @IsNotEmpty()
    storeID:Types.ObjectId
    
}