import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './schema/product.schema';
import { StoresService, ValidationMode } from '../stores/stores.service';

export enum findMode {
  FINDING = 'finding',
  UPDATING = 'updating',
  DELETING = 'deleting',
  CREATING = 'creating'
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<Products>, private storesService: StoresService,) { }


  async createNewProduct(createProductDto: CreateProductDto) {
    const { storeID, productID, productName, price } = createProductDto;
    await this.storesService.getStoreByID(storeID, ValidationMode.FINDING);
    await this.findOneProduct(productID, findMode.CREATING);
    await this.validateProductName(productName);
    if(price >= 0){
    return await this.productModel.create(createProductDto);
    } else {
      throw new BadRequestException('Price must be greater than or equal to 0');
    }
  }


  async findAllProducts() {
    return await this.productModel.find()
  }

  async findOneProduct(productID: string, mode: findMode = findMode.FINDING) {
    if (mode === findMode.FINDING || mode === findMode.DELETING || mode === findMode.UPDATING) {
      const product = await this.productModel.findOne({ productID: productID });
      if (!product) { throw new NotFoundException('Product not found') }
      return product
    }
    else {
      const product = await this.productModel.findOne({ productID: productID });
      if (product) { throw new ConflictException("ProductID in body is either the same with the currently being updated product or it's already assigned to another Product") }
    }
  }

  async updateProduct(productid: string, updateProductDto: UpdateProductDto) {
    const {productID,productName} = updateProductDto
   await this.findOneProduct(productid, findMode.UPDATING);
    await this.findOneProduct(productID, findMode.CREATING)
   await this.validateProductName(productName)
   
    return await this.productModel.findOneAndUpdate({ productID: productid }, updateProductDto, { returnDocument: 'after' })
  }

  async deleteProduct(productID: string) {

    await this.findOneProduct(productID, findMode.DELETING);
    return await this.productModel.findOneAndDelete({ productID: productID })
  }


  async getProductsInThisStore(storeID: string) {
    await this.storesService.getStoreByID(storeID, ValidationMode.FINDING);
    const products = await this.productModel
      .find({ storeID: storeID })
      .select('productID productName quantity price -_id');
    
    return products;
  }

  //validation functions
 
 async validateProductName(name: string) {
        const existingProduct = await this.productModel.findOne({ productName: name });
    if (existingProduct) {
      throw new ConflictException("Product with that Name already exists")
    }

  }


}
