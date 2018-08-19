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

  selectOptions = {
    title: 'Pizza Toppings',
    subTitle: 'Select your toppings',
    mode: 'md'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public choferService: ChoferServiceProvider) {
    console.log("GESATEPED>>Begin connection");
    choferService.list().subscribe((data: Chofer[])=>{
      console.log("GESATEPED>>connection result",data);
      console.log("data",data);
      this.choferes = data;
    }, error => {
      console.log("GESATEPED ERROR>>" + JSON.stringify(error));
    });

  }

  public login() {
    this.navCtrl.push(HojaRutaPage,{chofer: this.chofer});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
