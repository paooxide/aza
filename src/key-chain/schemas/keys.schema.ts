import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types, Document } from 'mongoose';

export type KeysDocument = Keys & Document;

@Schema({ timestamps: true, strict: false })
export class Keys {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  apiKey: string;

  @Prop({ type: MongooseSchema.Types.String })
  apiSecret: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}
export const KeysSchema = SchemaFactory.createForClass(Keys);
