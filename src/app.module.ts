import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, StoresModule, ChatsModule,
    ConfigModule.forRoot({isGlobal:true}),MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.register({global:true, secret:'1234'})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
