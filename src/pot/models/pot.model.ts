import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PotDocument = Pot & Document;

@Schema()
export class Pot {
  @Prop()
  _id: mongoose.Types.ObjectId;

  @Prop()
  sessionId: mongoose.Types.ObjectId;

  @Prop()
  balance: number;
}

export const PotSchema = SchemaFactory.createForClass(Pot);
