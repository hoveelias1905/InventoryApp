import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from '../users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Users.name,
      schema: UserSchema
    }
    
  ]),UsersModule,StoresModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
