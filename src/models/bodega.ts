import {Distrito} from "./distrito";

export interface Bodega {
  codigo: String,
  nombre: String,
  direccion: String,
  email: String,
  distrito: Distrito
}
