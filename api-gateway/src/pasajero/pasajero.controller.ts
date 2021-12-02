import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySuperFlights } from '../common/proxy/client.proxy';
import { PasajeroInterface } from '../common/interfaces/pasajero.interface';
import { PasajeroDTO } from './dto/pasajero.dto';
import { PasajerosMensajes } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
@ApiTags('pasajeros')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/pasajero')
export class PasajeroController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyPasajero = this.clientProxy.clientProxyPasajeros();

  @Post()
  create(@Body() campos: PasajeroDTO): Observable<PasajeroInterface> {
    return this._clientProxyPasajero.send(PasajerosMensajes.CREATE, campos);
  }

  @Get()
  findAll(): Observable<PasajeroInterface[]> {
    return this._clientProxyPasajero.send(PasajerosMensajes.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<PasajeroInterface> {
    return this._clientProxyPasajero.send(PasajerosMensajes.FIND_ONE, id);
  }

  @Put(':id')
  updated(
    @Param('id') id: string,
    @Body() campos: PasajeroDTO,
  ): Observable<PasajeroInterface> {
    return this._clientProxyPasajero.send(PasajerosMensajes.UPDATE, {
      id,
      campos,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<PasajeroInterface> {
    return this._clientProxyPasajero.send(PasajerosMensajes.DELETE, id);
  }
}
