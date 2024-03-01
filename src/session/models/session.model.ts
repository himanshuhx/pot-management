import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop()
  id: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  pots: [];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
