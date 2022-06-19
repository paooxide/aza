import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export default class Locale {
  @Prop()
  locales: string[];

  @Prop()
  primaryLocale: string;

  @Prop()
  region: string;

  @Prop()
  timezone: string;

  @Prop()
  languages: string[];
}

export const LocaleSchema = SchemaFactory.createForClass(Locale);
