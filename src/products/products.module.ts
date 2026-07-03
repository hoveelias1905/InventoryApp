import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from './schema/product.schema';
import { Stores, StoreSchema } from '../stores/schema/store.schema';
import { StoresModule } from '../stores/stores.module';

@Module({
   imports:[StoresModule,MongooseModule.forFeature([
    { 
      name: Products.name,
      schema: ProductSchema
    },
    { 
      name: Stores.name,
      schema: StoreSchema
    }]
    )],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
