import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class CreateSessionDto {
  public _id: mongoose.Types.ObjectId;

  @IsString()
  startTime: Date;

  @IsString()
  @IsNotEmpty()
  sessionDuration: number;

  @IsString()
  @IsNotEmpty()
  potSize: number;
}
