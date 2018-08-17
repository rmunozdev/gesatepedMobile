import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Chofer} from "../../models/chofer";
import {GesatepedConstants} from "../../constants";

/*
  Generated class for the ChoferServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChoferServiceProvider {

  listChoferesUrl = "http://localhost:8080/GesatepedWS/despachos/choferes"
  constructor(public http: HttpClient) {
    console.log('Hello ChoferServiceProvider Provider');
  }

  public list(){
    return this.http.get(GesatepedConstants.CHOFER_LIST_URL);
  }

}
