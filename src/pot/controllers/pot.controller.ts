import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePotDto } from '../dto/create-pot.dto';
import { ReturnPotDto } from '../dto/return-pot.dto';
import { UpdatePotDto } from '../dto/update-pot.dto';
import { PotService } from '../services/pot.service';

@Controller('pot')
export class PotController {
  constructor(
    private readonly potService: PotService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createPots(
    @Body() createPotsDto: CreatePotDto[],
  ): Promise<ReturnPotDto[]> {
    this.logger.log('creating pots for pot game via post API');
    return await this.potService.createPots(createPotsDto);
  }

  @Get()
  async getAllPots(): Promise<ReturnPotDto[]> {
    this.logger.log('GETting all registered pots for pot game via GET API');
    return await this.potService.getAllPots();
  }

  @Get('/:potId')
  async getPotById(@Param('potId') potId: string): Promise<ReturnPotDto> {
    this.logger.log(`Searching pot with potId: ${potId} via Get API`);
    return await this.potService.getPotById(potId);
  }

  @Patch('/:potId')
  async updatePotById(
    @Param('potId') potId: string,
    @Body() updatePotRequestBody: UpdatePotDto,
  ): Promise<ReturnPotDto> {
    this.logger.log(`updating pot with potId: ${potId} via Patch API`);
    return await this.potService.updatePotById(potId, updatePotRequestBody);
  }
}
