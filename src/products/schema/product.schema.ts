
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Stores } from 'src/stores/schema/store.schema'

export enum productCategories {
    'food',
    'drink'
}
@Schema()
export class Products {


    @Prop({ type: Types.ObjectId, ref: Stores.name })
    storeID: Types.ObjectId


    @Prop({ required: true, unique: true, enum: productCategories })
    category: productCategories

    @Prop({ required: true, unique: true })
    productID: string

    @Prop({ required: true, unique: true })
    productName: string


    @Prop({ required: true })
    quantity: number

    @Prop({ required: true })
    price: number


}

export const ProductSchema = SchemaFactory.createForClass(Products)
ProductSchema.index({ storeID: 1, category: 1, productID: 1 })



