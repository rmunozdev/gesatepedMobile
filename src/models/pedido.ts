import {Producto} from "./producto";
import {Bodega} from "./bodega";

export interface Pedido {
  numeroVerificacion: String,
  fechaRecojoTienda: String,
  fechaReprogramacion: String,
  fechaCancelacion: String,
  fechaDevolucionPed: String,
  codigoMotivo: String,
  distritoDespacho: String,
  tiendaDevolucion: String,
  detalle: String,
  codigoPedido: String,
  cliente: String,
  numeroReserva: String,
  fechaSolicitud: String,
  fechaVentaPedido: String,
  fechaDespacho: String,
  fechaRetiro: String,
  direccionDespacho: String,
  tienda: String,
  listaDetallePedido: String
}

export interface DetallePedido {
  pedido: Pedido,
  producto:  Producto,
  cantidadProductoDefectuoso: number,
  observacionProductoDefectuoso: String,
  cantidadProductoNoUbicable: number,
  bodega: Bodega,
  cantidadProducto: number
}
