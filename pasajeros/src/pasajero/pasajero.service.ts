import { Injectable } from '@nestjs/common';
import { PasajeroDTO } from './dto/pasajero.dto';
import { PasajeroInterface } from '../common/interfaces/pasajero.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASAJERO } from 'src/common/models/models';
import { Model } from 'mongoose';
import { UserInterface } from 'src/common/interfaces/user.interface';

@Injectable()
export class PasajeroService {
  constructor(
    @InjectModel(PASAJERO.name) private readonly model: Model<UserInterface>,
  ) {}
  async create(campos: PasajeroDTO): Promise<PasajeroInterface> {
    const newPasajero = new this.model(campos);
    return await newPasajero.save();
  }

  async findAll(): Promise<PasajeroInterface[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<PasajeroInterface> {
    return this.model.findById(id);
  }

  async update(id: string, campos: PasajeroDTO): Promise<PasajeroInterface> {
    return await this.model.findByIdAndUpdate(id, campos, { new: true });
  }

  async delete(id: string): Promise<PasajeroInterface> {
    const pasajero = await this.model.findById(id);
    await this.model.findByIdAndDelete(id);
    return pasajero;
  }
}
