import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './schema/user.schema';
import { Stores, StoreSchema } from '../stores/schema/store.schema';
import { AuthModule } from '../auth/auth.module';
import { StoresModule } from '../stores/stores.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports:[StoresModule,MongooseModule.forFeature([{ 
    name: Users.name,
    schema: UserSchema
  },
   { 
    name: Stores.name,
    schema: StoreSchema
  }]
  )],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
