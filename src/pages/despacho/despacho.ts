import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DespachoServiceProvider} from "../../providers/despacho-service/despacho-service";
import {Motivo} from "../../models/motivo";
import {DetalleHojaRuta} from "../../models/hoja-ruta";
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {HojaRutaPage} from "../hoja-ruta/hoja-ruta";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  responseCode: number;
  validacionAtencion : String;
  validacionIncumplimiento : String;
  imageFormat : String;
  numeroVerificacionControl : AbstractControl;
  motivoControl: AbstractControl;
  atencionForm : FormGroup;
  incumplimientoForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public despachoService: DespachoServiceProvider,
              private camera: Camera,
              private geolocation: Geolocation,
              private alertController: AlertController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder) {
    this.detalleHojaRuta = <DetalleHojaRuta>{};
    this.detalleHojaRuta.codigoHojaRuta = navParams.get("codigoHojaRuta");
    this.detalleHojaRuta.pedido = navParams.get("pedido");
    this.despachoService.listMotivos().subscribe((data:Motivo[])=>{
      this.motivos = data;
    });
    this.modo = "atencion";

    this.atencionForm = this.formBuilder.group({
      numeroVerificacionControl : ['',
        Validators.compose([Validators.required])]

    });
    this.numeroVerificacionControl = this.atencionForm.controls['numeroVerificacionControl'];


    this.incumplimientoForm = this.formBuilder.group({
      motivoControl : ['',
        Validators.compose([Validators.required])]
    });
    this.motivoControl = this.incumplimientoForm.controls['motivoControl'];
  }


  public registrarAtencion() {
    this.obtenerPosicion().then(()=>{
      let loading = this.presentLoadingDefault();
      this.despachoService.registrarAtencion(this.detalleHojaRuta).subscribe(data=>{
        //loading.dismiss();
        console.log("GESATEPED>>ATENCION REGISTRADA",data);
        if(data && data.codigo == 1) {
          this.showAlert();
        } else if(data.mensaje) {
          this.responseCode = data.codigo;
          this.validacionAtencion = data.mensaje;
        } else if(data.mensajes && data.mensajes.length > 0) {
          this.validacionAtencion = data.mensajes[0];
        }
      } ,error => {
        console.log("GESATEPED>>FALLO REGISTRO ATENCION" + JSON.stringify(error));
      });
    });
  }

  public registrarIncumplimiento() {
    this.obtenerPosicion().then(()=>{
      let loading = this.presentLoadingDefault();
      this.despachoService.registrarIncumplimiento(this.detalleHojaRuta).subscribe(data=>{
        //loading.dismiss();
        console.log("GESATEPED>>INCUMPLIMIENTO REGISTRADO",data);
        console.log("Success",data);
        if(data && data.codigo == 1) {
          this.showAlert();
        } else if(data.mensaje) {
          this.validacionIncumplimiento = data.mensaje;
        } else if(data.mensajes && data.mensajes.length > 0) {
          this.validacionIncumplimiento = data.mensajes[0];
        }
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
    this.validacionAtencion = null;
    this.validacionIncumplimiento = null;
    this.responseCode = 0;
  }

  public showAlert() {
    let alert = this.alertController.create({
      message: '¡Registro completo!',
      buttons: [
        {
          text: 'Finalizar',
          handler: data => {
            let navTransition = alert.dismiss();
            navTransition.then(()=>{
              this.navCtrl.popToRoot();
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  public salir() {
    this.navCtrl.pop();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Procesando...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    return loading;
  }
}
