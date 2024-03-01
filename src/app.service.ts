import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPotGame(): string {
    return 'Pot Game App!';
  }
}
