import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Users } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stores } from './schema/store.schema';
import { Products } from '../products/schema/product.schema';

@Injectable()
export class StoresService {
      constructor(@InjectModel(Users.name) private userModel: Model<Users>,
      @InjectModel(Stores.name) private storesModel: Model<Stores>,
      @InjectModel(Products.name) private prodcuctsModel: Model<Products>) { }
  
  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all stores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
