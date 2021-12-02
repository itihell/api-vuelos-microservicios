import { Schema } from 'mongoose';
export const VueloSchema = new Schema(
  {
    piloto: { type: String, required: true },
    avion: { type: String, required: true },
    destino: { type: String, required: true },
    fecha: { type: Date, required: true },
    pasajeros: [{ type: Schema.Types.ObjectId, ref: 'pasajeros' }],
  },
  { timestamps: true },
);
