import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class GameDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  potId: string;
}
