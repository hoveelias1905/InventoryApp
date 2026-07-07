import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";

@Schema()
export class RefreshToken extends Document{
    @Prop({required:true})
    refreshtoken:string

    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    userID: Types.ObjectId;

    @Prop({required:true})
    expiryDate: Date;
}

export const RefreshTokenSchema= SchemaFactory.createForClass(RefreshToken);
//RefreshTokenSchema.index({}) 