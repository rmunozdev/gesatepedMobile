import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GesatepedConstants} from "../../constants";
import {ResponseContentType} from "@angular/http";

/*
  Generated class for the ConnectionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectionServiceProvider {

  private baseURL: string;
  private static PROXIED_URL: string = "http://localhost:8100/proxied";

  constructor(public http: HttpClient) {
    console.log('Hello ConnectionServiceProvider Provider at '  + new Date());
  }

  public testConnection():Promise<boolean> {
    return new Promise<boolean>((resolve,reject)=>{
      const httpOptions = {
        responseType: 'blob' as 'blob',
        headers : new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/octet-stream',
          'content-type':'application/octet-stream'
        })
      };
      console.log("GESATEPED>>BEGIN CONNECT TO " + this.getBaseURL() + GesatepedConstants.IMAGE_PATH);
      this.http.get(this.getBaseURL() + GesatepedConstants.IMAGE_PATH,
        httpOptions)
        .subscribe(()=>{
        resolve(true);
      },error =>{
        console.log("GESATEPED>>Error connection" + JSON.stringify(error));
        resolve(false);
      });
    });
  }

  public getBaseURL():string {
    if(typeof window['cordova'] === 'undefined') {
      // Pruebas locales
      return ConnectionServiceProvider.PROXIED_URL;
    } else {
      return this.baseURL;
    }
  }

  public setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
  }

}
