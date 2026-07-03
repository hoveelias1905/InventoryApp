import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Stores } from 'src/stores/schema/store.schema'

export enum userTypes {
    'cashier',
    'admin'
}
@Schema()
export class Users {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true, select:false})
    password: string

    @Prop({ required: true, type: userTypes })
    userType: userTypes

    @Prop({ required: false })
    contact?: number

    @Prop({type:Types.ObjectId, ref: Stores.name })
    storeID: Types.ObjectId

}

export const UserSchema = SchemaFactory.createForClass(Users)
UserSchema.index({ username: 1 })