import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VueloInterface } from 'src/common/interfaces/vuelo.interface';
import { VUELO } from 'src/common/models/models';
import { VueloTDO } from './dto/vuelo.tdo';
import axios from 'axios';
import * as moment from 'moment';
import { UbicacionInterface } from '../common/interfaces/ubicacion.interface';
import { ClimnaInterface } from 'src/common/interfaces/clima.interface';

@Injectable()
export class VueloService {
  constructor(
    @InjectModel(VUELO.name) private readonly model: Model<VueloInterface>,
  ) {}

  async getUbicacion(destino: string): Promise<UbicacionInterface> {
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${destino}`,
    );

    return data[0];
  }
  async getClima(woeid: number, fecha: Date): Promise<ClimnaInterface[]> {
    const dateForma = moment.utc(fecha).format();
    const anio = dateForma.substring(0, 4);
    const mes = dateForma.substring(5, 7);
    const dia = dateForma.substring(8, 10);

    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/${anio}/${mes}/${dia}/`,
    );

    return data;
  }

  assign(
    { _id, piloto, avion, destino, fecha, pasajeros }: VueloInterface,
    clima: ClimnaInterface[],
  ): VueloInterface {
    return Object.assign({
      _id,
      piloto,
      avion,
      destino,
      fecha,
      pasajeros,
      clima,
    });
  }

  async create(campos: VueloTDO): Promise<VueloInterface> {
    const newVuelo = new this.model(campos);
    return await newVuelo.save();
  }

  async findAll(): Promise<VueloInterface[]> {
    return await this.model.find().populate('pasajeros');
  }

  async findOne(id: string): Promise<VueloInterface> {
    const vuelo = await this.model.findById(id).populate('pasajeros');

    const ubicacion: UbicacionInterface = await this.getUbicacion(
      vuelo.destino,
    );

    const clima: ClimnaInterface[] = await this.getClima(
      ubicacion.woeid,
      vuelo.fecha,
    );
    return this.assign(vuelo, clima);
  }

  async update(id: string, campos: VueloTDO): Promise<VueloInterface> {
    return await this.model
      .findByIdAndUpdate(id, campos, { new: true })
      .populate('pasajeros');
  }
  async delete(id: string): Promise<VueloInterface> {
    const oldVuelo = this.model.findById(id);
    await this.model.findByIdAndDelete(id);
    return await oldVuelo;
  }
  async createPasajero(
    vueloId: string,
    pasajeroId: string,
  ): Promise<VueloInterface> {
    return await this.model
      .findByIdAndUpdate(
        vueloId,
        { $addToSet: { pasajeros: pasajeroId } },
        { new: true },
      )
      .populate('pasajeros');
  }
}
