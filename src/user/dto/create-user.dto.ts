import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from '@nestjs/class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  public _id: mongoose.Types.ObjectId;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsNumber()
  balance: number;
}
