import { Injectable } from '@nestjs/common';
import { Session, SessionDocument } from '../models/session.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSessionDto } from '../dto/create-session.dto';
import { ReturnSessionDto } from '../dto/return-session.dto';
import { UpdateSessionDto } from '../dto/update-session.dto';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async save(createSessionDto: CreateSessionDto): Promise<ReturnSessionDto> {
    const session = new this.sessionModel(createSessionDto);
    return await session.save();
  }

  async getAllSessions(): Promise<ReturnSessionDto[]> {
    return await this.sessionModel.find();
  }

  async getSessionById(sessionId: string): Promise<ReturnSessionDto> {
    const session = await this.sessionModel.findById(sessionId);
    return session;
  }

  async updateSessionById(
    sessionId,
    updateSessionRequestBody: UpdateSessionDto,
  ): Promise<ReturnSessionDto> {
    return await this.sessionModel
      .findByIdAndUpdate({ _id: sessionId }, updateSessionRequestBody, {
        new: true,
      })
      .exec();
  }

  async deleteSessionById(sessionId: string): Promise<any> {
    return await this.sessionModel.deleteOne({ _id: sessionId });
  }
}
