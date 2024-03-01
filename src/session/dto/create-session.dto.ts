import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class CreateSessionDto {
  private _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  private sessionDuration: number;

  @IsString()
  @IsNotEmpty()
  private potSize: number;
}
