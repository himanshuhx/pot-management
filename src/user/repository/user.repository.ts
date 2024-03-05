import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.model';
import { ReturnUserDto } from '../dto/return-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async save(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async getAllUsers(): Promise<ReturnUserDto[]> {
    return await this.userModel.find();
  }

  async getAllUsersWithSessionIdAndPotId(
    sessionId: string,
    potId: string,
  ): Promise<ReturnUserDto[]> {
    return await this.userModel.find({ sessionId: sessionId, potId: potId });
  }

  async getUserById(bookId: string): Promise<ReturnUserDto> {
    return await this.userModel.findOne({ _id: bookId });
  }

  async updateUserById(
    userId: string,
    updateUserRequestBody: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, updateUserRequestBody, {
        new: true,
      })
      .exec();
  }

  async deleteUserById(userId: string): Promise<any> {
    return await this.userModel.deleteOne({ _id: userId });
  }
}
