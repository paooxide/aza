import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export default class GeneralRegion {
  @Prop()
  regions: string[];

  @Prop()
  myLocation: boolean;

  @Prop()
  deviceSettings: boolean;
}

export const GeneralRegionSchema = SchemaFactory.createForClass(GeneralRegion);
