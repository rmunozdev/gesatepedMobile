import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chofer} from "../../models/chofer";
import {HojaRuta} from "../../models/hoja-ruta";
import {RutaServiceProvider} from "../../providers/ruta-service/ruta-service";

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
              public rutaService: RutaServiceProvider) {
    this.chofer = navParams.get("chofer");
    this.rutaService.get(this.chofer.numeroBrevete).subscribe((data:HojaRuta) => {
      this.hojaRuta = data;
    });
    console.log("chofer",this.chofer);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HojaRutaPage');
  }

}
