import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'modal-imagen',
  templateUrl: 'imagen.html'
})
export class ImagenModal {

  imagen: String;

  constructor(public viewCtrl: ViewController,
              public params: NavParams) {
    this.imagen = params.get('imagen');
  }

  public close() {
    this.viewCtrl.dismiss();
  }
}
