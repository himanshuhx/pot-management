import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PotDocument = Pot & Document;

@Schema()
export class Pot {
  @Prop()
  sessionId: string;

  @Prop()
  balance: number;
}

export const PotSchema = SchemaFactory.createForClass(Pot);
