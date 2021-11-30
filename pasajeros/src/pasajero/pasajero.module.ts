import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PASAJERO } from 'src/common/models/models';
import { PasajeroController } from './pasajero.controller';
import { PasajeroService } from './pasajero.service';
import { PasajeroSchema } from './schema/pasajero.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASAJERO.name,
        useFactory: () => PasajeroSchema,
      },
    ]),
  ],
  controllers: [PasajeroController],
  providers: [PasajeroService],
  exports: [PasajeroService],
})
export class PasajeroModule {}
