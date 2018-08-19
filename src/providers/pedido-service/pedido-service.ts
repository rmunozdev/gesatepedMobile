import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";

/*
  Generated class for the PedidoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidoServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PedidoServiceProvider Provider');
  }

  public obtenerDetalles(codigoPedido,codigoBodega) {
    return this.http.get(GesatepedConstants.PEDIDO_DETAIL_URL + codigoBodega + "/" + codigoPedido);
  }
}
