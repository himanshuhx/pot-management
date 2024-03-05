import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ReturnSessionDto } from '../dto/return-session.dto';
import { SessionRepository } from '../repository/session.repository';
import { CreateSessionDto } from '../dto/create-session.dto';
import { PotService } from '../../pot/services/pot.service';
import { Pot } from '../../pot/models/pot.model';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly potService: PotService,
    private readonly logger: Logger,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
  ): Promise<ReturnSessionDto> {
    try {
      // calculate end time for session on basis of session duration provided
      const endTime = new Date(createSessionDto.startTime);
      endTime.setHours(endTime.getHours() + createSessionDto.sessionDuration);
      createSessionDto.endTime = endTime;

      // save session Object in DB
      const session = await this.sessionRepository.save(createSessionDto);

      let pots = [];
      // create pots on the basis of potSize provided
      for (let i = 0; i < createSessionDto.potSize; i++) {
        // register a new pot
        const pot = new Pot();
        pot.sessionId = session._id;
        pot.balance = 1000;
        pots.push(pot);
      }

      // save pots in pot collection
      const savedPots = await this.potService.createPots(pots);

      //get pot ids and update session collection
      const potIds = [];
      for (const pot of savedPots) {
        potIds.push(pot._id);
      }

      return await this.updateSessionById(session._id, { pots: potIds });
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to create session with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllSessions(): Promise<ReturnSessionDto[]> {
    try {
      this.logger.log('retrieving All Sessions Data');
      return await this.sessionRepository.getAllSessions();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to retrieve sessions with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getSessionById(sessionId): Promise<ReturnSessionDto> {
    try {
      this.logger.log(`retrieving Session with ${sessionId}`);
      const sessionDetails =
        await this.sessionRepository.getSessionById(sessionId);
      if (sessionDetails) {
        return sessionDetails;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to retrieve Session, no Session found with id:${sessionId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          error: err.message,
        },
        err.status,
      );
    }
  }

  async updateSessionById(
    sessionId,
    updateSessionRequestBody,
  ): Promise<ReturnSessionDto> {
    try {
      this.logger.log(`updating Session with ${sessionId}`);
      const sessionDetails =
        await this.sessionRepository.getSessionById(sessionId);
      if (sessionDetails) {
        return await this.sessionRepository.updateSessionById(
          sessionId,
          updateSessionRequestBody,
        );
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to update session, no session found with id:${sessionId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          error: err.message,
        },
        err.status,
      );
    }
  }
}
