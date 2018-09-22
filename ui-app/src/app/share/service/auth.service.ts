import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILogin} from "../model/login";
import {ILoginResponse} from "../model/login-response";
import {ISignUpRequest} from "../model/signup-request";

import { LocalStorage } from '@ngx-pwa/local-storage';

type EntityLoginResponseType = HttpResponse<ILoginResponse>;
type EntitySignUpResponseType = HttpResponse<any>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private resourceUrl = 'api/auth';


  constructor(private http: HttpClient) {}

  login(login: ILogin): Observable<EntityLoginResponseType> {
    return this.http.post<ILoginResponse>(this.resourceUrl+'/signin', login, { observe: 'response' });
  }

  signup(signup: ISignUpRequest): Observable<EntitySignUpResponseType> {
    return this.http.post<ILoginResponse>(this.resourceUrl+'/signup', signup, { observe: 'response' });
  }

}
