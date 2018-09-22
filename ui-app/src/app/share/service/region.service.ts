import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegion} from "../model/region";

type EntityResponseType = HttpResponse<IRegion>;
type EntityArrayResponseType = HttpResponse<IRegion[]>;

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private resourceUrl = 'api/regions';

  constructor(private http: HttpClient) {}

  create(region: IRegion): Observable<EntityResponseType> {
    return this.http.post<IRegion>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegion): Observable<EntityResponseType> {
    return this.http.put<IRegion>(this.resourceUrl, region, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IRegion[]>(this.resourceUrl, { observe: 'response' });
  }


  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
