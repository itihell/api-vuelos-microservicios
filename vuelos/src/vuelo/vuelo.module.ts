import { Module } from '@nestjs/common';
import { VueloController } from './vuelo.controller';
import { VueloService } from './vuelo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VUELO, PASAJERO } from 'src/common/models/models';
import { VueloSchema } from './schema/vuelo.schema';
import { PasajeroSchema } from './schema/pasajero.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: VUELO.name,
        useFactory: () => VueloSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PASAJERO.name,
        useFactory: () => PasajeroSchema,
      },
    ]),
  ],
  controllers: [VueloController],
  providers: [VueloService],
})
export class VueloModule {}
