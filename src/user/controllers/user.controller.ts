import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ReturnUserDto } from '../dto/return-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    this.logger.log('creating user for pot game via post API');
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    this.logger.log('GETting all registered users for pot game via GET API');
    return await this.userService.getAllUsers();
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string): Promise<ReturnUserDto> {
    this.logger.log(`Searching user with userId: ${userId} via Get API`);
    return await this.userService.getUserById(userId);
  }

  @Patch('/:userId')
  async updateUserById(
    @Param('userId') userId: string,
    @Body() updateUserRequestBody: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    this.logger.log(`updating user with userId: ${userId} via Patch API`);
    return await this.userService.updateUserById(userId, updateUserRequestBody);
  }
}
