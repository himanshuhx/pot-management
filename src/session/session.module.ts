import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import { SessionRepository } from './repository/session.repository';
import { Session, SessionSchema } from './models/session.model';
import { PotModule } from 'src/pot/pot.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    PotModule,
  ],
  controllers: [SessionController],
  providers: [SessionService, SessionRepository, Logger],
  exports: [SessionService],
})
export class SessionModule {}
