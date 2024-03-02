import { IsNumber } from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsNumber()
  balance: number;
}
