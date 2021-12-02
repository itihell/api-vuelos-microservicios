import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySuperFlights } from '../common/proxy/client.proxy';
import { VueloInterface } from '../common/interfaces/vuelo.interface';
import { VueloTDO } from './dto/vuelos.dto';
import { VuelosMensajes, PasajerosMensajes } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
@ApiTags('vuelos')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/vuelo')
export class VueloController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyFlight = this.clientProxy.clientProxyVuelos();
  private _clientProxyPasajero = this.clientProxy.clientProxyPasajeros();

  @Post()
  create(@Body() campos: VueloTDO): Observable<VueloInterface> {
    return this._clientProxyFlight.send(VuelosMensajes.CREATE, campos);
  }

  @Get()
  findAll(): Observable<VueloInterface[]> {
    return this._clientProxyFlight.send(VuelosMensajes.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<VueloInterface> {
    return this._clientProxyFlight.send(VuelosMensajes.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() campos: VueloTDO,
  ): Observable<VueloInterface> {
    return this._clientProxyFlight.send(VuelosMensajes.UPDATE, { id, campos });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<VueloInterface> {
    return this._clientProxyFlight.send(VuelosMensajes.DELETE, id);
  }

  @Post(':vueloId/pasajero/:pasajeroId')
  async addPasajero(
    @Param('vueloId') vueloId: string,
    @Param('pasajeroId') pasajeroId: string,
  ) {
    const pasajero = await this._clientProxyPasajero
      .send(PasajerosMensajes.FIND_ONE, pasajeroId)
      .toPromise();

    if (!pasajero) {
      throw new HttpException('Pasajero no encontrado', HttpStatus.NOT_FOUND);
    }

    return this._clientProxyFlight.send(VuelosMensajes.ADD_PASAJERO, {
      vueloId,
      pasajeroId,
    });
  }
}
