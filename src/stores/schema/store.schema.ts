import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Stores {

    @Prop({ required: true, unique: true })
    storeID: string

    @Prop({ required: true, unique: true })
    storeName: string

    @Prop({ required: true })
    manager: string

    @Prop({ required: true })
    address: string



}

export const StoreSchema = SchemaFactory.createForClass(Stores)
StoreSchema.index({ storeID: 1,manager:1})