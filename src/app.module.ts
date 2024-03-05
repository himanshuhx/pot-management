import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SessionModule } from './session/session.module';
import { PotModule } from './pot/pot.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SessionModule,
    PotModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
