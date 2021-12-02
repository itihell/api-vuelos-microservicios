import { ClimnaInterface } from './clima.interface';
import { PasajeroInterface } from './pasajero.interface';

export interface VueloInterface extends Document {
  _id?: string;
  piloto: string;
  avion: string;
  destino: string;
  fecha: Date;
  pasajeros: PasajeroInterface[];
  clima: ClimnaInterface[];
}
