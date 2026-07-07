import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsString, Length, Matches, MaxLength, Min} from "class-validator";
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
    @Length(6,6)
    @Matches(/^PRD[0-9]{3}$/, { message: 'Product ID must start with PRD followed by 3 digits' })
    productID:string
    
    @IsString()
    @IsNotEmpty()
    productName:string

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    quantity: number

    @IsDecimal()
    @IsNotEmpty()
    price: number

}
