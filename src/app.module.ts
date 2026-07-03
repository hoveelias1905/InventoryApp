import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, StoresModule, ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
