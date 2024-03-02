import { IsNumber } from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class UpdateSessionDto {
  public _id: mongoose.Types.ObjectId;

  @IsNumber()
  pots: [];
}
