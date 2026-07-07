import { IsNotEmpty, IsString, IsUppercase, Length, length, Matches, MaxLength, MinLength } from "class-validator";
export class CreateStoreDto {

    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    @Length(6,6)
    @Matches(/^STO[0-9]{3}$/, { message: 'storeID must start with STO followed by 3 digits' })
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
