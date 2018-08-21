import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Chofer} from "../../models/chofer";
import {GesatepedConstants} from "../../constants";
import {ConnectionServiceProvider} from "../connection-service/connection-service";

/*
  Generated class for the ChoferServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChoferServiceProvider {

  listChoferesUrl = "http://localhost:8080/GesatepedWS/despachos/choferes"
  constructor(public http: HttpClient,
              public connectionService: ConnectionServiceProvider) {
    console.log('Hello ChoferServiceProvider Provider');
  }

  public list(){
    console.log("GESATEPED>>Begin connection to " + this.connectionService.getBaseURL() + GesatepedConstants.CHOFER_LIST_PATH + " >>");
    const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'content-type':'application/json'
      })
    };
    return this.http.get(this.connectionService.getBaseURL() + GesatepedConstants.CHOFER_LIST_PATH,httpOptions);
  }

}
