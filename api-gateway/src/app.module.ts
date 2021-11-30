import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PasajeroModule } from './pasajero/pasajero.module';
import { VueloModule } from './vuelo/vuelo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    UserModule,
    PasajeroModule,
    VueloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
