import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  balance: number;

  @Prop()
  sessionId: string;

  @Prop()
  potId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
