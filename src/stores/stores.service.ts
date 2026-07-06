import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stores } from './schema/store.schema';
import { after } from 'node:test';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Stores.name) private storeModel: Model<Stores>) { }

  async createStore({ storeID, ...createStoreDto }: CreateStoreDto) {
    await this.validateStoreID(storeID);

    const newStore = new this.storeModel({
      storeID, ...createStoreDto
    })
    return await newStore.save()
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {
    await this.getStoreByID(id)
    const updatedStore = await this.storeModel.findOneAndUpdate({storeID:id}, updateStoreDto,{returnDocument:'after'})
    return updatedStore;

  }
  async getAllStores() {
    return await this.storeModel.find()
  }

  async getStoreByID(id: string) {
    await this.validateStoreID(id)
    const store = await this.storeModel.findOne({id})

    if (!store) {
     throw new NotFoundException('Store Not Found')
    }
    return store;
  }


  async deleteStore(id: string) {
    await this.getStoreByID(id)
    await this.storeModel.findOneAndDelete({storeID:id})
    return `Deleted ${id} succesfully`
  }

  validateStoreID(id: string) {
    if (id.length !== 6) {
      throw new HttpException("Use a valid storeID, has 6 characters", 400)
    }
    if (!id.startsWith('STO', 0)) {
      throw new HttpException("Use a valid storeID, starts With 'STO'", 400)
    }

  }


}
