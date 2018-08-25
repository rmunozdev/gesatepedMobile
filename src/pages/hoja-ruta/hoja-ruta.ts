import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Chofer} from "../../models/chofer";
import {DetalleHojaRuta, HojaRuta} from "../../models/hoja-ruta";
import {RutaServiceProvider} from "../../providers/ruta-service/ruta-service";
import {PedidoPage} from "../pedido/pedido";
import * as moment from 'moment';


/**
 * Generated class for the HojaRutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hoja-ruta',
  templateUrl: 'hoja-ruta.html',
})
export class HojaRutaPage {

  chofer: Chofer;
  hojaRuta : HojaRuta;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rutaService: RutaServiceProvider
              ) {

    this.chofer = navParams.get("chofer");
    this.rutaService.get(this.chofer.numeroBrevete).subscribe((data:HojaRuta) => {
      this.hojaRuta = data;
    });
    console.log("chofer",this.chofer);
  }

  public verPedido(detalle:DetalleHojaRuta) {
    this.navCtrl.push(PedidoPage,
      {
        pedido : detalle.pedido,
        bodega : this.hojaRuta.bodega,
        codigoHojaRuta: this.hojaRuta.codigo,
        destinatario: detalle.destinatario
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HojaRutaPage');
  }

  public getDateValue(currentDate) {
    var fecha = moment(new Date(currentDate).toUTCString());
    return fecha.format("DD/MM/YYYY");
  }

}
