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
  firstPendiente: String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rutaService: RutaServiceProvider
              ) {

    this.chofer = navParams.get("chofer");
    this.rutaService.get(this.chofer.numeroBrevete).subscribe((data: HojaRuta) => {
      this.hojaRuta = data;
      this.updateIndex();
      setInterval(()=>{
        this.rutaService.isModified('HRU0000004')
          .subscribe(result =>{
          if(result) {
            console.log("Is modified");
            this.rutaService.get(this.chofer.numeroBrevete).subscribe((nuevo : HojaRuta) =>{
              this.hojaRuta = nuevo;
              this.updateIndex();
            });
          } else {
            console.log("Is not modified");
          }
        });
      },15000);
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

  private updateIndex() {
    let index = 0;
    for(let i=0; i<this.hojaRuta.detalles.length; i++) {
      if(this.hojaRuta.detalles[i].estado == 'Pendiente') {
        this.firstPendiente = this.hojaRuta.detalles[i].pedido.codigoPedido;
        return;
      }
      index++;
    }

  }

}
