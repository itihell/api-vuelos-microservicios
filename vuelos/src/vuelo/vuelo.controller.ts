import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VueloService } from './vuelo.service';
import { VueloTDO } from './dto/vuelo.tdo';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VuelosMensajes } from '../common/constants';

@Controller()
export class VueloController {
  constructor(private readonly vueloService: VueloService) {}

  @MessagePattern(VuelosMensajes.CREATE)
  create(@Payload() campos: VueloTDO) {
    return this.vueloService.create(campos);
  }

  @MessagePattern(VuelosMensajes.FIND_ALL)
  findAll() {
    return this.vueloService.findAll();
  }

  @MessagePattern(VuelosMensajes.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.vueloService.findOne(id);
  }

  @MessagePattern(VuelosMensajes.UPDATE)
  update(@Payload() payload: any) {
    return this.vueloService.update(payload.id, payload.campos);
  }

  @MessagePattern(VuelosMensajes.DELETE)
  delete(@Payload('id') id: string) {
    return this.vueloService.delete(id);
  }

  @MessagePattern(VuelosMensajes.ADD_PASAJERO)
  addPasajero(@Payload() payload: any) {
    return this.vueloService.createPasajero(
      payload.vueloId,
      payload.pasajeroId,
    );
  }
}
