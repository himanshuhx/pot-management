import { IsNumber } from '@nestjs/class-validator';

export class UpdateSessionDto {
  @IsNumber()
  pots: [];
}
