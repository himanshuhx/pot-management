import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export class CreatePotDto {
  public _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  sessionId: ObjectId;

  @IsNumber()
  balance: number;
}
