import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Stores } from '../stores/schema/store.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Stores.name) private storeModel: Model<Stores>,
        @InjectModel(Products.name) private prodcuctModel: Model<Products>) {}


  async createNewProduct(createProductDto: CreateProductDto) {
    this.validateProductID(createProductDto.productID)
    const find = await this.findOne(createProductDto.productID);
    if (!find){
      const product = new this.prodcuctModel(createProductDto);
      return  product.save()
    }
    return new ConflictException('Product alredy exists')
  }

  async findAllProducts() {
    return await this.prodcuctModel.find()
  }

  async findOne(productID: string) {
    this.validateProductID(productID)
    const product = await this.prodcuctModel.findOne({productID});
    if (!product){ return new NotFoundException('Product not found')}
    return product
  }

  async updateProduct(productID: string,updateProductDto: UpdateProductDto) {
    this.validateProductID(productID)
    this.findOne(productID)
    return await this.prodcuctModel.findOneAndUpdate({productID:productID},updateProductDto,{returnDocument:'after'})
  }

 async deleteProduct(productID:string) {
  this.findOne(productID)
     return await this.prodcuctModel.findOneAndDelete({productID:productID})
  }

  validateProductID(productID: string){
    if (!productID.startsWith('PRD',0)){
      return new HttpException('InvalidID must start with PRD',401)
    }
    console.log("")
  }

}
