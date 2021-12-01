import { Controller } from '@nestjs/common';
import { PasajeroDTO } from './dto/pasajero.dto';
import { PasajeroService } from './pasajero.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PasajerosMensajes } from '../common/constants';

@Controller()
export class PasajeroController {
  constructor(private readonly pasajeroService: PasajeroService) {}

  @MessagePattern(PasajerosMensajes.CREATE)
  create(@Payload() campos: PasajeroDTO) {
    return this.pasajeroService.create(campos);
  }

  @MessagePattern(PasajerosMensajes.FIND_ALL)
  findAll() {
    return this.pasajeroService.findAll();
  }

  @MessagePattern(PasajerosMensajes.FIND_ONE)
  findOne(@Payload() id: string) {
    console.log(id)
    return this.pasajeroService.findOne(id);
  }

  @MessagePattern(PasajerosMensajes.UPDATE)
  update(@Payload() payload: any) {
    return this.pasajeroService.update(payload.id, payload.campos);
  }

  @MessagePattern(PasajerosMensajes.DELETE)
  delete(@Payload() id: string) {
    return this.pasajeroService.delete(id);
  }
}
