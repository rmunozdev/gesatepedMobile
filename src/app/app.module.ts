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
import {HttpClientModule} from "@angular/common/http";
import {HojaRutaPage} from "../pages/hoja-ruta/hoja-ruta";
import { RutaServiceProvider } from '../providers/ruta-service/ruta-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HojaRutaPage
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
    HojaRutaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityServiceProvider,
    ChoferServiceProvider,
    RutaServiceProvider
  ]
})
export class AppModule {}
