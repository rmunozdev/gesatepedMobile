import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {RutaServiceProvider} from "./ruta-service";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class RutaInterceptor implements HttpInterceptor {

  constructor(private ruta: RutaServiceProvider) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Cookie: `${this.ruta.getSession()}`
      }
    });
    return next.handle(request);
  }
}
