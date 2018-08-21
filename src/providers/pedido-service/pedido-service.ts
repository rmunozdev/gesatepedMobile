import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";
import {ConnectionServiceProvider} from "../connection-service/connection-service";

/*
  Generated class for the PedidoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidoServiceProvider {

  constructor(public http: HttpClient,public connectionService: ConnectionServiceProvider) {
    console.log('Hello PedidoServiceProvider Provider');
  }

  public obtenerDetalles(codigoPedido,codigoBodega) {
    return this.http.get(this.connectionService.getBaseURL() +
      GesatepedConstants.PEDIDO_DETAIL_PATH +
      codigoBodega + "/" +
      codigoPedido);
  }
}
