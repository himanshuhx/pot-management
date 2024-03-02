import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class CreatePotDto {
  public _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsNumber()
  balance: number;
}
