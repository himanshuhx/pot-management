import { Body, Controller, Get, Logger } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameDto } from '../dto/game.dto';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async playGame(@Body() gameDto: GameDto) {
    this.logger.log(
      `Starting game with session Id ${gameDto.sessionId} and potId ${gameDto.potId}`,
    );
    return await this.gameService.playGame(gameDto);
  }
}
