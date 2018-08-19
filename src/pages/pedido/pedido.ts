import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetallePedido, Pedido} from "../../models/pedido";
import {PedidoServiceProvider} from "../../providers/pedido-service/pedido-service";
import {Bodega} from "../../models/bodega";
import {DespachoPage} from "../despacho/despacho";

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  pedido: Pedido;
  bodega: Bodega;
  destinatario: String;
  codigoHojaRuta: String;
  detallesPedido : DetallePedido[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pedidoService: PedidoServiceProvider) {
    this.pedido = navParams.get("pedido");
    this.bodega = navParams.get("bodega");
    this.destinatario = navParams.get("destinatario");
    this.codigoHojaRuta = navParams.get("codigoHojaRuta");
    this.pedidoService.obtenerDetalles(
      this.pedido.codigoPedido,
      this.bodega.codigo).subscribe((data:DetallePedido[])=>{
        this.detallesPedido = data;
    });
    ;
  }

  public iniciarDespacho() {
    this.navCtrl.push(DespachoPage, {
      pedido: this.pedido,
      codigoHojaRuta: this.codigoHojaRuta
    });
  }

  public salir() {
    this.navCtrl.pop();
  }

}
