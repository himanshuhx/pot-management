import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop()
  private _id: mongoose.Types.ObjectId;

  @Prop()
  private startTime: Date;

  @Prop()
  private endTime: Date;

  @Prop()
  private pots: [];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
