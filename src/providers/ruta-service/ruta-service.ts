import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";

/*
  Generated class for the RutaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RutaServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RutaServiceProvider Provider');
  }

  public get(breveteChofer:String) {
    return this.http.get(GesatepedConstants.PEDIDO_LIST_URL + breveteChofer);
  }

}
