import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UsePipes(new ValidationPipe)
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return await this.storesService.createStore(createStoreDto);
  }

  @Get()
  @UsePipes(new ValidationPipe)
 async getAllStores() {
    return await  this.storesService.getAllStores();
  }

  @Get('/find/:id')
  @UsePipes(new ValidationPipe)
  async findStore(@Param('id') storeID: string) {
    return  await this.storesService.getStoreByID(storeID);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe)
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return await  this.storesService.updateStore(id, updateStoreDto);
  }

  @Delete('/delete/:id')
  @UsePipes(new ValidationPipe)
  async deleteStore(@Param('id') id: string) {
    return await this.storesService.deleteStore(id);
  }
}
