import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICountry} from "../model/country";

type EntityResponseType = HttpResponse<ICountry>;
type EntityArrayResponseType = HttpResponse<ICountry[]>;

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private resourceUrl = 'api/countrys';

  constructor(private http: HttpClient) {}

  create(country: ICountry): Observable<EntityResponseType> {
    return this.http.post<ICountry>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountry): Observable<EntityResponseType> {
    return this.http.put<ICountry>(this.resourceUrl, country, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountry>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ICountry[]>(this.resourceUrl, { observe: 'response' });
  }


  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
