import { Module } from '@nestjs/common';
import { PasajeroController } from './pasajero.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PasajeroController],
})
export class PasajeroModule {}
