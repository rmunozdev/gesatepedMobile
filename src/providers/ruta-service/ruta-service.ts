import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";
import {ConnectionServiceProvider} from "../connection-service/connection-service";

/*
  Generated class for the RutaServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RutaServiceProvider {

  constructor(public http: HttpClient,public connectionService: ConnectionServiceProvider) {
    console.log('Hello RutaServiceProvider Provider');
  }

  public get(breveteChofer:String) {
    return this.http.get(this.connectionService.getBaseURL() +
      GesatepedConstants.PEDIDO_LIST_PATH +
      breveteChofer);
  }

}
