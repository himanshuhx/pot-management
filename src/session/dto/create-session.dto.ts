import { IsDate, IsEmpty, IsNotEmpty, IsString } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class CreateSessionDto {
  public _id: mongoose.Types.ObjectId;

  @IsDate()
  startTime: Date;

  @IsString()
  @IsNotEmpty()
  sessionDuration: number;

  @IsEmpty()
  endTime: Date;

  @IsString()
  @IsNotEmpty()
  potSize: number;
}
