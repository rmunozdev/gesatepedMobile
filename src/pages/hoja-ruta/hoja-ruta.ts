import {ApplicationRef, Component, ElementRef, ViewChild} from '@angular/core';
import {App, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Chofer} from "../../models/chofer";
import {DetalleHojaRuta, HojaRuta} from "../../models/hoja-ruta";
import {RutaServiceProvider} from "../../providers/ruta-service/ruta-service";
import {PedidoPage} from "../pedido/pedido";
import * as moment from 'moment';
import {LoginPage} from "../login/login";


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
  @ViewChild('rutas') rutas: Content;

  chofer: Chofer;
  hojaRuta : HojaRuta;
  firstPendiente: String;
  currentInterval: any;

  offsetPositions: number[];
  offsetTopMarker: number;
  offsetDetallesMarker: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public rutaService: RutaServiceProvider,
              private app: ApplicationRef
              ) {
    this.chofer = navParams.get("chofer");
    this.offsetPositions = new Array<number>();
  }


  ionViewWillEnter() {
    this.rutaService.get(this.chofer.numeroBrevete).subscribe((data: HojaRuta) => {
      this.hojaRuta = data;
      if(this.hojaRuta.codigo == null) {
        //Print message on view
      } else {
        this.updateIndex();
        this.setScrollPosition();
        this.currentInterval = setInterval(()=>{
          console.log("Fired function by Interval id: " + this.hojaRuta.codigo);
          this.rutaService.isModified(this.hojaRuta.codigo)
            .subscribe(result =>{
              if(result) {
                console.log("Is modified");
                this.rutaService.get(this.chofer.numeroBrevete).subscribe((hojaRuta : HojaRuta) =>{
                  this.hojaRuta = hojaRuta;
                  this.updateIndex();
                  this.setScrollPosition();
                });
              } else {
                console.log("Is not modified");
              }
            });
        },15000);
      }
    });
  }

  ionViewWillLeave() {
    if(this.currentInterval) {
      clearInterval(this.currentInterval);
      console.log("Interval clear");
    }
    console.log("You leave HojaRutaPage");
  }

  public verPedido(detalle:DetalleHojaRuta) {
    this.navCtrl.push(PedidoPage,
      {
        pedido : detalle.pedido,
        bodega : this.hojaRuta.bodega,
        codigoHojaRuta: this.hojaRuta.codigo,
        destinatario: detalle.destinatario,
        despachoActivo: (this.firstPendiente == detalle.pedido.codigoPedido)
      });
  }




  public getDateValue(currentDate) {
    var fecha = moment(new Date(currentDate).toUTCString());
    return fecha.format("DD/MM/YYYY");
  }

  public returnToHome() {
    this.navCtrl.push(LoginPage);
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

  private setScrollPosition() {
    setTimeout(()=>{
      if(this.offsetPositions.length == 0) {
        this.initOffsetPositions();
      }
      let index = 0;

      for(let i=0; i<this.hojaRuta.detalles.length; i++) {
        if(this.hojaRuta.detalles[i].estado == 'Pendiente') {
          console.log("Move to", this.offsetPositions[i] - this.offsetTopMarker);
          this.rutas.scrollTo(0,this.offsetPositions[i] - this.offsetTopMarker);
          this.app.tick();
          return;
        }
        index++;
      }
    },500);
  }

  private initOffsetPositions() {
    let topmarker = document.getElementById('topmarker');
    let detallesMarker = document.getElementById('detallesMarker');
    this.offsetTopMarker = topmarker?topmarker.getBoundingClientRect().top:0;
    this.offsetDetallesMarker = detallesMarker?detallesMarker.getBoundingClientRect().top:0;
    for(let i=0; i<this.hojaRuta.detalles.length; i++) {
      let current = document.getElementById('desp' +
        this.hojaRuta.detalles[i].ordenDespachoPedido);
      let offsetCurrent = current?current.getBoundingClientRect().top:0;
      this.offsetPositions.push(offsetCurrent);
    }
    console.log("offsetTopmarker",this.offsetTopMarker);
    console.log("offsetDetallesMarker",this.offsetDetallesMarker);
    console.log("Offset positions initialized", this.offsetPositions);
  }


  public tConvert(time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[4] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  public getColor(estado) {
    switch(estado) {
      case "Pendiente": return "primary";
      case "Atendido": return "secondary";
      default: return "danger";
    }
  }

}
