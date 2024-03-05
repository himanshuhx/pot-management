import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePotDto } from '../dto/create-pot.dto';
import { ReturnPotDto } from '../dto/return-pot.dto';
import { PotRepository } from '../repository/pot.repository';
import { UpdatePotDto } from '../dto/update-pot.dto';

@Injectable()
export class PotService {
  constructor(
    private readonly potRepository: PotRepository,
    private readonly logger: Logger,
  ) {}

  async createPots(createPotsDto: CreatePotDto[]): Promise<ReturnPotDto[]> {
    try {
      this.logger.log('Registering new Pots');
      return await this.potRepository.save(createPotsDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Failed to create pot with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllPotsFromSessionId(sessionId: string): Promise<ReturnPotDto[]> {
    try {
      this.logger.log(`retrieving All pots for session with id: ${sessionId}`);
      return await this.potRepository.getAllPotsFromSessionId(sessionId);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Failed to retrieve pots with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getPotById(potId): Promise<ReturnPotDto> {
    try {
      this.logger.log(`retrieving Session with ${potId}`);
      const potDetails = await this.potRepository.getPotById(potId);
      if (potDetails) {
        return potDetails;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to retrieve pot, no pot found with id:${potId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          message: err.message,
        },
        err.status,
      );
    }
  }

  async updatePotById(
    potId: string,
    updatePotRequestBody: UpdatePotDto,
  ): Promise<ReturnPotDto> {
    try {
      this.logger.log(`updating Pot with ${potId}`);
      const potDetails = await this.potRepository.getPotById(potId);
      if (potDetails) {
        return await this.potRepository.updatePotById(
          potId,
          updatePotRequestBody,
        );
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to update pot, no pot found with id:${potId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          message: err.message,
        },
        err.status,
      );
    }
  }

  async deletePotById(potId: string): Promise<any> {
    try {
      this.logger.log(`deleting POT with id: ${potId}`);
      const potDetails = await this.potRepository.getPotById(potId);
      if (potDetails) {
        return await this.potRepository.deletePotById(potId);
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to delete pot, no pot found with id:${potId}`,
        });
      }
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          message: err.message,
        },
        err.status,
      );
    }
  }
}
