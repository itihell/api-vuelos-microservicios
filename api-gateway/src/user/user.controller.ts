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
import { ClientProxySuperFlights } from '../common/proxy/client.proxy';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { UserInterface } from '../common/interfaces/user.interface';
import { UserMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
@ApiTags('usuarios')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientPorxy: ClientProxySuperFlights) {}
  private _clienteProxyUser = this.clientPorxy.clientProxyUsers();

  @Post()
  create(@Body() campos: UserDTO): Observable<UserInterface> {
    return this._clienteProxyUser.send(UserMSG.CREATE, campos);
  }

  @Get()
  findAll(): Observable<UserInterface[]> {
    return this._clienteProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserInterface> {
    return this._clienteProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() campos: UserDTO,
  ): Observable<UserInterface> {
    return this._clienteProxyUser.send(UserMSG.UPDATE, { id, campos });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<UserInterface> {
    return this._clienteProxyUser.send(UserMSG.DELETE, id);
  }
}
