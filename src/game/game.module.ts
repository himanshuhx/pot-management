import { Logger, Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { GameService } from './services/game.service';
import { SessionService } from 'src/session/services/session.service';
import { PotService } from 'src/pot/services/pot.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { SessionModule } from 'src/session/session.module';
import { PotModule } from 'src/pot/pot.module';
import { UserRepository } from 'src/user/repository/user.repository';
import { SessionRepository } from 'src/session/repository/session.repository';
import { PotRepository } from 'src/pot/repository/pot.repository';
import { User } from 'src/user/models/user.model';
import { Session } from 'src/session/models/session.model';
import { Pot } from 'src/pot/models/pot.model';

@Module({
  imports: [SessionModule, PotModule, UserModule],
  controllers: [GameController],
  providers: [GameService, Logger],
})
export class GameModule {}
