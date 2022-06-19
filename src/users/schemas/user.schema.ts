import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import Locale, { LocaleSchema } from './locale.schema';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { UserActiveStatus } from '../users.service';
import Device, { DeviceSchema } from './device.schema';
import {
  UserType,
  AdminAccess,
  GenderType,
  PronounsType,
} from '../types/users.types';

export type UserDocument = User & Document;

@Schema({ timestamps: true, strict: false })
export class User {
  @Prop({ type: MongooseSchema.Types.String, required: true })
  firstName: string;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  lastName: string;

  @Prop({ type: MongooseSchema.Types.String })
  birthday?: string;

  @Prop({ type: MongooseSchema.Types.String, enum: GenderType })
  gender?: GenderType;

  @Prop({ type: MongooseSchema.Types.String, enum: PronounsType })
  pronouns?: PronounsType;

  @Prop()
  email: string;

  @Prop({ type: Object })
  facebookSocialLogin?: {
    id: string;
    type: string;
    accessToken: string;
  };

  @Prop({ type: Object })
  googleSocialLogin?: {
    id: string;
    type: string;
    accessToken: string;
  };

  @Prop({ type: Object })
  twitterSocialLogin?: {
    id: string;
    type: string;
    accessToken: string;
  };

  @Prop({ type: Object })
  appleSocialLogin?: {
    id: string;
    type: string;
    accessToken: string;
  };

  @Prop({ type: MongooseSchema.Types.String, unique: true })
  username: string;

  @Prop({ select: false })
  hash?: string;

  @Prop({ select: false })
  salt?: string;

  @Prop()
  bio: string;

  @Prop()
  profilePic: string;

  @Prop()
  tags: string[];

  @Prop({ type: LocaleSchema })
  locale: Locale;

  @Prop({ type: MongooseSchema.Types.Number, default: 0 })
  userActiveStatus: UserActiveStatus;

  @Prop()
  reason?: string;

  @Prop({ type: [DeviceSchema] })
  devices?: Device[];

  @Prop({
    type: MongooseSchema.Types.String,
    enum: UserType,
    default: UserType.individual,
  })
  type: UserType;

  @Prop({
    type: MongooseSchema.Types.String,
    enum: AdminAccess,
    default: AdminAccess.user,
  })
  privilege: AdminAccess;
}
export const UserSchema = SchemaFactory.createForClass(User);
