import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PotService } from 'src/pot/services/pot.service';
import { PotRepository } from 'src/pot/repository/pot.repository';
import { PotController } from './controllers/pot.controller';
import { Pot, PotSchema } from './models/pot.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pot.name, schema: PotSchema }])],
  controllers: [PotController],
  providers: [PotService, PotRepository, PotRepository, Logger],
  exports: [PotService],
})
export class PotModule {}
