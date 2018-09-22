
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private localStorage: LocalStorage){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token_id");

    if (token){
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer "+token)
      });
      return next.handle(cloned)
    } else {
      return next.handle(req)
    }
  }

}
