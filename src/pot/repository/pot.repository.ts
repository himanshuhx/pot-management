import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pot, PotDocument } from '../models/pot.model';
import { CreatePotDto } from '../dto/create-pot.dto';
import { UpdatePotDto } from '../dto/update-pot.dto';
import { ReturnPotDto } from '../dto/return-pot.dto';

@Injectable()
export class PotRepository {
  constructor(
    @InjectModel(Pot.name)
    private readonly potModel: Model<PotDocument>,
  ) {}

  async save(createPotsDto: CreatePotDto[]): Promise<ReturnPotDto[]> {
    return await this.potModel.insertMany(createPotsDto);
  }

  async getAllPots(): Promise<ReturnPotDto[]> {
    return await this.potModel.find();
  }

  async getPotById(bookId: string): Promise<ReturnPotDto> {
    return await this.potModel.findOne({ _id: bookId });
  }

  async updatePotById(
    potId: string,
    updatePotRequestBody: UpdatePotDto,
  ): Promise<ReturnPotDto> {
    return await this.potModel
      .findOneAndUpdate({ _id: potId }, updatePotRequestBody, {
        new: true,
      })
      .exec();
  }

  async deletePotById(userId: string): Promise<any> {
    return await this.potModel.deleteOne({ _id: userId });
  }
}
