import {Bodega} from "./bodega";
import {UnidadChofer} from "./unidad-chofer";
import {Pedido} from "./pedido";
import {Motivo} from "./motivo";

export interface HojaRuta {
  codigo: String,
  fechaGeneracion: String,
  fechaDespacho: String,
  bodega:  Bodega,
  unidadChofer: UnidadChofer,
  detalles: DetalleHojaRuta[]
}

export interface DetalleHojaRuta {
  codigoHojaRuta ?: String,
  pedido ?: Pedido,
  ordenDespachoPedido?: number,
  tiempoPromedioDespacho?: String,
  fechaEstimPartida?: String,
  tiempoEstimadoLlegada?: String,
  distanciaEstimada?: number,
  fechaEstimLlegada?: String,
  fechaPactadaDespacho?: String,
  fechaNoCumplimientoDespacho?: String,
  latGPSDespachoPedido?: number,
  longGPSDespachoPedido?: number,
  fotoDespachoPedido?: String,
  ventana?: String,
  motivo?: Motivo,
  destinatario?: String,
  domicilio?: String,
  horario?: String,
  estado?: String
}
