import {HttpClient, HttpHeaders} from '@angular/common/http';
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
    console.log("GESATEPED>>Begin connection to " + GesatepedConstants.CHOFER_LIST_URL + " >>");
    const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'content-type':'application/json'
      })
    };
    return this.http.get(GesatepedConstants.CHOFER_LIST_URL,httpOptions);
  }

}
