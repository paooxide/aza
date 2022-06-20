import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TransactionsDocument = Transactions & Document;

@Schema({ timestamps: true })
export class Transactions {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  customerID: string;

  @Prop({ type: MongooseSchema.Types.Number })
  inputAmount: number;

  @Prop()
  inputCurrency: string;

  @Prop({ type: MongooseSchema.Types.Number })
  outputAmount: number;

  @Prop()
  outputCurrency: string;
}
export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
