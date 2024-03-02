import {
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ReturnSessionDto } from '../dto/return-session.dto';
import { SessionRepository } from '../repository/session.repository';
import { CreateSessionDto } from '../dto/create-session.dto';

export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly logger: Logger,
  ) {}

  async createSession(
    createSessionDto: CreateSessionDto,
  ): Promise<ReturnSessionDto> {
    try {
      this.logger.log('Registering new Session');
      return await this.sessionRepository.save(createSessionDto);
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
