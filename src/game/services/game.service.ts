import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GameDto } from '../dto/game.dto';
import { SessionService } from 'src/session/services/session.service';
import { PotService } from 'src/pot/services/pot.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class GameService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly potService: PotService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  async playGame(gameDto: GameDto) {
    try {
      // check if the sessionId and potId requested is valid
      const session = await this.sessionService.getSessionById(
        gameDto.sessionId,
      );

      const pot = await this.potService.getPotById(gameDto.potId);

      // validate whether the provided pot is assciated with provided session
      await this.validatePotSessionAssociation(session._id, pot._id);

      // Get All users registered for the pot
      const registeredUsers =
        await this.userService.getAllUsersWithSessionIdAndPotId(
          gameDto.sessionId,
          gameDto.potId,
        );

      if (registeredUsers && registeredUsers.length > 0) {
        this.logger.log('starting game');
        await this.startGame(registeredUsers, session, pot);
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          message: `Failed to play game with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async startGame(registeredUsers, session, pot) {
    const potMoney = pot.balance;
    if (potMoney > 0) {
      const wonMoneyByEachUser = potMoney / registeredUsers.length;
      // update money in userAccount
      for (const user of registeredUsers) {
        const newBalance = user.balance + wonMoneyByEachUser;
        await this.userService.updateUserById(user._id, {
          balance: newBalance,
        });
      }
    }
    this.logger.log(`game concluded for session: ${session._id}`);
  }

  async validatePotSessionAssociation(sessionId, potId) {
    const associatedPotsWithSession =
      await this.potService.getAllPotsFromSessionId(sessionId);
    const isPotAssociated = associatedPotsWithSession.some(
      (associatedPot) => associatedPot._id === potId,
    );
    if (!isPotAssociated) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Failed to play game pot id provided does not associates with the session`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
