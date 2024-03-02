import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  balance: string;

  @Prop()
  sessionId: string;

  @Prop()
  potId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
