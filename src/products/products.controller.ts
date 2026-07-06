import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createNewProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.createNewProduct(createProductDto)
  }

  @Get('/allProducts')
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @Patch(':productid')
  @UsePipes(ValidationPipe)
  update(@Param('productid') productid: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(productid,updateProductDto)
  }
  @Delete(':id')
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
