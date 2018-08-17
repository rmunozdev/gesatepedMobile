import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chofer} from "../../models/chofer";
import {SecurityServiceProvider} from "../../providers/security-service/security-service";
import {ChoferServiceProvider} from "../../providers/chofer-service/chofer-service";
import {HojaRutaPage} from "../hoja-ruta/hoja-ruta";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  chofer : Chofer;
  choferes : Chofer[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public choferService: ChoferServiceProvider) {
    choferService.list().subscribe((data: Chofer[])=>{
      console.log("data",data);
      this.choferes = data;
    });
  }

  public login() {
    this.navCtrl.push(HojaRutaPage,{chofer: this.chofer});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
