import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ReturnUserDto } from '../dto/return-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    try {
      this.logger.log('Registering new User');
      return await this.userRepository.save(createUserDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to create user with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllUsers(): Promise<ReturnUserDto[]> {
    try {
      this.logger.log('retrieving All User Data');
      return await this.userRepository.getAllUsers();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to retrieve user with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getAllUsersWithSessionIdAndPotId(
    sessionId: string,
    potId: string,
  ): Promise<ReturnUserDto[]> {
    try {
      this.logger.log(
        `retrieving All User Datawith session Id ${sessionId} and potId ${potId}`,
      );
      return await this.userRepository.getAllUsersWithSessionIdAndPotId(
        sessionId,
        potId,
      );
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `Failed to retrieve user with error: ${err.message}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getUserById(userId): Promise<ReturnUserDto> {
    try {
      this.logger.log(`retrieving Session with ${userId}`);
      const userDetails = await this.userRepository.getUserById(userId);
      if (userDetails) {
        return userDetails;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to retrieve User, no User found with id:${userId}`,
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

  async updateUserById(
    userId: string,
    updateUserRequestBody: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    try {
      this.logger.log(`updating Session with ${userId}`);
      const userDetails = await this.userRepository.getUserById(userId);
      if (userDetails) {
        return await this.userRepository.updateUserById(
          userId,
          updateUserRequestBody,
        );
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Failed to update book, no session found with id:${userId}`,
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
