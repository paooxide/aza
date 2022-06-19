import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema({ _id: false })
@Schema({ timestamps: true })
export default class Device {
  @Prop()
  deviceId: string;

  @Prop()
  pushToken: string;

  @Prop()
  nativePushToken?: string;

  @Prop()
  bundleId: string;

  @Prop()
  brandManufacturer: string;

  @Prop()
  deviceModel: string;

  @Prop()
  osVersion: string;

  @Prop()
  appVersion: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
