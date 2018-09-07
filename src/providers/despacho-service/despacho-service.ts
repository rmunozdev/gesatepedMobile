import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";
import {DetalleHojaRuta} from "../../models/hoja-ruta";
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Config} from "ionic-angular";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DespachoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DespachoServiceProvider {

  constructor(public http: HttpClient,
              public connectionService: ConnectionServiceProvider)
 {
    console.log('Hello DespachoServiceProvider Provider');
  }

  public listMotivos() {
    return this.http.get(this.connectionService.getBaseURL() + GesatepedConstants.MOTIVO_LIST_PATH);
  }

  public registrarAtencion(detalleHojaRuta: DetalleHojaRuta):Observable<any> {
    detalleHojaRuta.fechaPactadaDespacho = new Date().toISOString();
    return this.http.post<any>(this.connectionService.getBaseURL() + GesatepedConstants.PEDIDO_ATENCION_PATH,detalleHojaRuta);
  }

  public registrarIncumplimiento(detalleHojaRuta: DetalleHojaRuta):Observable<any> {
    detalleHojaRuta.fechaNoCumplimientoDespacho = new Date().toISOString();
    return this.http.post<any>(this.connectionService.getBaseURL() + GesatepedConstants.PEDIDO_INCUMPLIMIENTO_PATH,detalleHojaRuta);
  }

}
