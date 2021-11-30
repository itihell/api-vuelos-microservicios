import { Module } from '@nestjs/common';
import { VueloController } from './vuelo.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [VueloController],
})
export class VueloModule {}
