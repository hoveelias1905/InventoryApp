import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from '../users/schema/user.schema';
import { Products, ProductSchema } from '../products/schema/product.schema';
import { Stores, StoreSchema } from './schema/store.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Users.name,
    schema: UserSchema
  },
  {
    name: Products.name,
    schema: ProductSchema
  },
  {
    name: Stores.name,
    schema: StoreSchema
  }]
  )],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService]
})
export class StoresModule { }
