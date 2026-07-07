import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Stores } from '../../stores/schema/store.schema'

export enum productCategories {
    food='food',
    drink='drink',
    electronics='electronics',
    clothing='clothing',
    furniture='furniture',
    hardware='hardware',
}
@Schema()
export class Products {


    @Prop({ type: Types.ObjectId, ref: Stores.name })
    storeID: Types.ObjectId


    @Prop({ required: true, enum: productCategories })
    category: productCategories

    @Prop({ required: true, unique: true })
    productID: string

    @Prop({ required: true, unique:true})
    productName: string


    @Prop({ required: true, type: Number, min: 0 })
    quantity: number

    @Prop({ required: true,type: Number, min: 0 })
    price: number


}

export const ProductSchema = SchemaFactory.createForClass(Products)
ProductSchema.index({ storeID: 1, category: 1, productID: 1 })
ProductSchema.index({ productID: 1, productName: 1 }, { unique: true })


