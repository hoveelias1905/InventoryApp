import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stores, StoreSchema } from './schema/store.schema';

@Module({
  imports:[MongooseModule.forFeature(
    [{
      name: Stores.name,
      schema: StoreSchema
    }]
  )],
  controllers: [StoresController],
  providers: [StoresService],
  exports:[StoresService]
})
export class StoresModule {}
