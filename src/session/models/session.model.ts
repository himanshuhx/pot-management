import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  _id: mongoose.Types.ObjectId;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  sessionDuration: number;

  @Prop()
  potSize: number;

  @Prop()
  pots: [];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
