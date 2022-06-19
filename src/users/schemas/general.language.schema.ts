import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export default class GeneralLanguage {
  @Prop()
  languages: string[];

  @Prop()
  deviceSettings: boolean;
}

export const GeneralLanguageSchema =
  SchemaFactory.createForClass(GeneralLanguage);
