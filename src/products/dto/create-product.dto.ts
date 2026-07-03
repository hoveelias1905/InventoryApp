import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
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
