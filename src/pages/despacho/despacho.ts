import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DespachoServiceProvider} from "../../providers/despacho-service/despacho-service";
import {Motivo} from "../../models/motivo";
import {DetalleHojaRuta} from "../../models/hoja-ruta";
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the DespachoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despacho',
  templateUrl: 'despacho.html',
})
export class DespachoPage {

  modo: String;
  motivos: Motivo[];
  detalleHojaRuta: DetalleHojaRuta;
  validacion : String;
  imageFormat : String;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public despachoService: DespachoServiceProvider,
              private camera: Camera,
              private geolocation: Geolocation) {
    this.detalleHojaRuta = <DetalleHojaRuta>{};
    this.detalleHojaRuta.codigoHojaRuta = navParams.get("codigoHojaRuta");
    this.detalleHojaRuta.pedido = navParams.get("pedido");
    this.despachoService.listMotivos().subscribe((data:Motivo[])=>{
      this.motivos = data;
    });
  }

  public registrarAtencion() {
    this.obtenerPosicion().then(()=>{
      this.despachoService.registrarAtencion(this.detalleHojaRuta).subscribe(data=>{
        console.log("GESATEPED>>ATENCION REGISTRADA",data);
        if(!data) {
          this.validacion = "Número de Verificación Incorrecto";
        }
      } ,error => {
        console.log("GESATEPED>>FALLO REGISTRO ATENCION" + JSON.stringify(error));
      });
    });
  }

  public registrarIncumplimiento() {
    this.obtenerPosicion().then(()=>{
      this.despachoService.registrarIncumplimiento(this.detalleHojaRuta).subscribe(data=>{
        console.log("GESATEPED>>INCUMPLIMIENTO REGISTRADO",data);
        console.log("Success",data);
      }, error => {
        console.log("GESATEPED>>FALLO REGISTRO INCUMPLIMIENTO" + JSON.stringify(error));
      });
    });

  }

  public obtenerImagen() {

    if (typeof window['cordova'] === 'undefined') {
      console.log("Camera not supported on browser");
      return;
    }

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageFormat = 'data:image/jpeg;base64,'
      let base64Image =  imageData;
      this.detalleHojaRuta.fotoDespachoPedido = base64Image;
      console.log("GESATEPED>>SUCCESS:Image established");
    }, (err) => {
      // Handle error
      console.log("GESATEPED>>ERROR:" + JSON.stringify(err));
    });
  }

  public obtenerPosicion() {
    return new Promise(((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.detalleHojaRuta.latGPSDespachoPedido = resp.coords.latitude;
        this.detalleHojaRuta.longGPSDespachoPedido = resp.coords.longitude;
        resolve();
      }).catch((error) => {
        console.log('Error getting location', error);
        reject();
      });
    }));

  }

  public clearValidation() {
    this.validacion = null;
  }
}
