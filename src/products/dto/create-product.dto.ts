import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength} from "class-validator";
import { productCategories } from "../schema/product.schema";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    storeID:string

    
    @IsString()
    @IsNotEmpty()
    @IsEnum(productCategories)
    category:productCategories

    @IsString()
    @IsNotEmpty()
    @MaxLength(6)
    productID:string
    
    @IsString()
    @IsNotEmpty()
    productName:string

    @IsInt()
    @IsNotEmpty()
    quantity: number

    @IsInt()
    @IsNotEmpty()
    price: number

}
