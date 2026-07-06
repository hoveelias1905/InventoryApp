import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Stores } from '../stores/schema/store.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/product.schema';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class ProductsService {
  constructor(
        @InjectModel(Products.name) private prodcuctModel: Model<Products>, private storesService: StoresService) {}


  async createNewProduct({storeID,...createProductDto}: CreateProductDto) {
    await this.storesService.getStoreByID(storeID);
    const find = await this.productValiateExist(createProductDto.productID);
    
    if (!find){
      const product = new this.prodcuctModel(createProductDto);
      return  product.save()
    }
  }

  async findAllProducts() {
    return await this.prodcuctModel.find()
  }

  async findOneProduct(productID: string) {
    this.validateProductID(productID)
    const product = await this.prodcuctModel.findOne({productID:productID});
    if (!product){ throw new NotFoundException('Product not found')}
    return product
  }

  async updateProduct(productID: string,updateProductDto: UpdateProductDto) {
    this.validateProductID(productID)
    this.findOneProduct(productID)
    return await this.prodcuctModel.findOneAndUpdate({productID:productID},updateProductDto,{returnDocument:'after'})
  }

 async deleteProduct(productID:string) {
  this.findOneProduct(productID)
     return await this.prodcuctModel.findOneAndDelete({productID:productID})
  }

  validateProductID(productID: string){
    if (!productID.startsWith('PRD',0)){
      return new HttpException('InvalidID must start with PRD',401)
    }
    console.log("")
  }

  async productValiateExist(productID){
    const exist= await this.prodcuctModel.findOne({productID})
    if (exist){ throw new ConflictException('ProductID alreday exist')}
    return null
  }

}
