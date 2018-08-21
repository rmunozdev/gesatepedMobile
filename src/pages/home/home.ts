import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {GesatepedConstants} from "../../constants";
import {ConnectionServiceProvider} from "../../providers/connection-service/connection-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public showConnectionSettings = false;
  public CONNECTED: boolean = false;
  public AFTER_SETTINGS: boolean = false;

  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              public connectionService: ConnectionServiceProvider) {
    console.log("GESATEPED>>Begin");
    if(!this.CONNECTED) {
      this.showConnectionSettings = true;
    }
  }

  public login() {
    this.navCtrl.push(LoginPage);
  }

  public config() {
    let alert = this.alertController.create({
      message: 'Ingrese parámetros de servidor',
      inputs: [
        {
          name: 'ip',
          placeholder: 'ip',
          type: 'tel'
        },
        {
          name: 'puerto',
          placeholder: 'puerto',
          type:'number'
        }
      ],
      buttons: [
        {
          text: 'Guardar',
          handler: data => {
            console.log("GESATEPED>>Begin TEST Connection");
            console.log("IP: " + data.ip);
            console.log("PORT: " + data.puerto);
            this.connectionService.setBaseURL("http://" + data.ip + ":" + data.puerto + "/GesatepedWS");
            this.connectionService.testConnection().then(success=>{
              if(success) {
                console.log("GESATEPED>>Success TEST Connection");
                this.CONNECTED = true;
                alert.dismiss();
              } else {
                alert.setMessage('Connection fail, try again');
              }
            });
            return false;
          }
        },
        {
          text: 'Salir',
          handler: data => {
            console.log("Chau");
          }
        }
      ]
    });
    alert.present();
    this.AFTER_SETTINGS = true;

  }
}
