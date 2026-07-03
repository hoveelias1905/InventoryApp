import { IsNotEmpty, IsString } from "class-validator";
export class CreateStoreDto {

    @IsString()
    @IsNotEmpty()
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
