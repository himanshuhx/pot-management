import { ReturnSessionDto } from '../dto/return-session.dto';

export class SessionService {
  constructor() {}

  async createSession(createSessionDto): Promise<ReturnSessionDto> {}

  async getAllSessions(): Promise<ReturnSessionDto[]> {}

  async getSessionById(sessionId): Promise<ReturnSessionDto> {}

  async updateSessionById(
    sessionId,
    updateSessionRequestBody,
  ): Promise<ReturnSessionDto> {}
}
