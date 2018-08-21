import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConnectionServiceProvider} from "../connection-service/connection-service";

/*
  Generated class for the SecurityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecurityServiceProvider {

  constructor(public http: HttpClient,public connectionService: ConnectionServiceProvider) {
    console.log('Hello SecurityServiceProvider Provider');
  }

  public getInitialContent() {
    this.http.get("").subscribe(response => {
      console.log(response);
    });
  }

}
