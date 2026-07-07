import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stores } from './schema/store.schema';
import { Products } from '../products/schema/product.schema';

export enum ValidationMode {
  CREATING = 'creating',
  FINDING = 'finding',
  UPDATING = 'updating',
  DELETING = 'deleting'
}

@Injectable()
export class StoresService {
  constructor(@InjectModel(Stores.name) private storeModel: Model<Stores>, @InjectModel(Products.name) private productModel: Model<Products>) { }

  async createStore(createStoreDto: CreateStoreDto) {
    const { storeID, storeName } = createStoreDto;
    await this.getStoreByID(storeID, ValidationMode.CREATING);
    await this.validateStoreName(storeName);
    return await this.storeModel.create(createStoreDto);
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {
    await this.getStoreByID(id, ValidationMode.UPDATING);
    const updatedStore = await this.storeModel.findOneAndUpdate({ storeID: id }, updateStoreDto, { returnDocument: 'after' })
    return updatedStore;

  }

  async deleteStore(id: string) {
    await this.getStoreByID(id, ValidationMode.DELETING);
    await this.storeModel.findOneAndDelete({ storeID: id })
    return `Deleted ${id} succesfully`
  }
  async getAllStores() {
    return await this.storeModel.find()
  }
  async getStoreByID(id: string, mode: ValidationMode) {
    await this.validateStoreIDFormat(id)

    if (mode === ValidationMode.UPDATING || mode === ValidationMode.FINDING || mode === ValidationMode.DELETING) {
      const existingStore = await this.storeModel.findOne({ storeID: id });
      if (!existingStore) {
        throw new NotFoundException('Store Not Found')
      }
      return null;
    }
    else {
      const existingStore = await this.storeModel.findOne({ storeID: id });
      if (existingStore) {
        throw new ConflictException(`Store with ID ${id} Already Exists`)
      }
      return null;
    }

  }

  // Validation functions
  validateStoreIDFormat(id: string) {
    // Validate storeID formats. called when creating, finding, updating or deleting a store, if the ID passes validation, it will be checked for existence in the database based on the mode. in the main getStoreByID function
    if (!id) {
      throw new BadRequestException('Store ID is required');
    }
    if (id.length !== 6) {
      throw new HttpException("Use a valid storeID, has 6 characters", 400)
    }
    if (!id.startsWith('STO', 0)) {
      throw new HttpException("Use a valid storeID, starts With 'STO'", 400)
    }
  }

  async validateStoreName(name: string) {
  const existingStore = await this.storeModel.findOne({ storeName: name });
    if (existingStore) {
      throw new ConflictException("Store Name already exists")
    }

  }
}



