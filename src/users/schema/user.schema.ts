import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Stores } from '../../stores/schema/store.schema'

export enum userTypes {
    cashier='cashier',
    admin='admin'
}
@Schema()
export class Users {
    @Prop({ required: true, unique: true })
    username: string

    @Prop({ required: true, select:false})
    password: string

    @Prop({ required: true, enum: userTypes})
    userType: userTypes

    @Prop({ required: false })
    contact?: number

    @Prop({ref: Stores.name })
    storeID: string

}

export const UserSchema = SchemaFactory.createForClass(Users)
