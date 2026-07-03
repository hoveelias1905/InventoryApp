import { IsNotEmpty, IsString, IsUppercase, length, MaxLength, MinLength } from "class-validator";
export class CreateStoreDto {

    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    @MaxLength(6)
    @MinLength(6)
    storeID:string

    @IsString()
    @IsNotEmpty()
    storeName:string
    
    @IsString()
    @IsNotEmpty()
    manager:string

    @IsString()
    @IsNotEmpty()
    address:string

        
  
}
