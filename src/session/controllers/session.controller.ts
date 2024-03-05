import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSessionDto } from '../dto/create-session.dto';
import { ReturnSessionDto } from '../dto/return-session.dto';
import { SessionService } from '../services/session.service';
import { UpdateSessionDto } from '../dto/update-session.dto';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<ReturnSessionDto> {
    this.logger.log('creating sessions for pot game via post API');
    return await this.sessionService.createSession(createSessionDto);
  }

  @Get()
  async getAllSessions(): Promise<ReturnSessionDto[]> {
    this.logger.log('GETting all registered sessions for pot game via GET API');
    return await this.sessionService.getAllSessions();
  }

  @Get('/:sessionId')
  async getBookById(
    @Param('sessionId') sessionId: string,
  ): Promise<ReturnSessionDto> {
    this.logger.log(
      `Searching session with sessionId: ${sessionId} via Get API`,
    );
    return await this.sessionService.getSessionById(sessionId);
  }

  @Patch('/:sessionId')
  async updateSessionById(
    @Param('sessionId') sessionId: string,
    @Body() updateSessionRequestBody: UpdateSessionDto,
  ): Promise<ReturnSessionDto> {
    this.logger.log(
      `updating session with sessionId: ${sessionId} via Patch API`,
    );
    return await this.sessionService.updateSessionById(
      sessionId,
      updateSessionRequestBody,
    );
  }

  @Delete('/:sessionId')
  async deleteSessionById(@Param('sessionId') sessionId: string): Promise<any> {
    this.logger.log(
      `deleting session with sessionId: ${sessionId} via DELETE API`,
    );
    return this.sessionService.deleteSessionById(sessionId);
  }
}
