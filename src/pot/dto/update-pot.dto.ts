import { IsNumber } from '@nestjs/class-validator';

export class UpdatePotDto {
  @IsNumber()
  balance: number;
}
