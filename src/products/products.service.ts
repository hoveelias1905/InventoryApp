import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Stores } from '../stores/schema/store.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Stores.name) private storesModel: Model<Stores>,
        @InjectModel(Products.name) private prodcuctsModel: Model<Products>) { }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
