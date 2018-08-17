import {Unidad} from "./unidad";
import {Chofer} from "./chofer";

export interface UnidadChofer {
  codigo: String,
  bodega: String,
  unidad: Unidad,
  chofer: Chofer,
  fechaAsignacion: String
}
