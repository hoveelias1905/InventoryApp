import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from './schema/product.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Products.name,
      schema: ProductSchema
    }
  ])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
