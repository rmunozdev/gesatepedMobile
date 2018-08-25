import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import { SecurityServiceProvider } from '../providers/security-service/security-service';
import { ChoferServiceProvider } from '../providers/chofer-service/chofer-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HojaRutaPage} from "../pages/hoja-ruta/hoja-ruta";
import { RutaServiceProvider } from '../providers/ruta-service/ruta-service';
import {PedidoPage} from "../pages/pedido/pedido";
import { PedidoServiceProvider } from '../providers/pedido-service/pedido-service';
import {DespachoPage} from "../pages/despacho/despacho";
import { DespachoServiceProvider } from '../providers/despacho-service/despacho-service';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ConnectionServiceProvider } from '../providers/connection-service/connection-service';
import {RutaInterceptor} from "../providers/ruta-service/RutaInterceptor";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HojaRutaPage,
    PedidoPage,
    DespachoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HojaRutaPage,
    PedidoPage,
    DespachoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityServiceProvider,
    ChoferServiceProvider,
    RutaServiceProvider,
    PedidoServiceProvider,
    DespachoPage,
    DespachoServiceProvider,
    Camera,
    Geolocation,
    ConnectionServiceProvider
  ]
})
export class AppModule {}
