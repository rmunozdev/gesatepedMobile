import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";
import {DetalleHojaRuta} from "../../models/hoja-ruta";

/*
  Generated class for the DespachoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DespachoServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DespachoServiceProvider Provider');
  }

  public listMotivos() {
    return this.http.get(GesatepedConstants.MOTIVO_LIST_URL);
  }

  public registrarAtencion(detalleHojaRuta: DetalleHojaRuta) {
    detalleHojaRuta.fechaPactadaDespacho = new Date().toISOString();
    return this.http.post(GesatepedConstants.PEDIDO_ATENCION_URL,detalleHojaRuta);
  }

  public registrarIncumplimiento(detalleHojaRuta: DetalleHojaRuta) {
    detalleHojaRuta.fechaNoCumplimientoDespacho = new Date().toISOString();
    return this.http.post(GesatepedConstants.PEDIDO_INCUMPLIMIENTO_URL,detalleHojaRuta);
  }

}
