import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IngenieroValuador } from '../models/ingenieros-valuadores.model';

@Injectable()
export class IngenierosService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/supervisor/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addIngeniero(ingeniero: IngenieroValuador): Observable<any> {
    let params =  JSON.stringify(ingeniero)  
    return this._http.post(this.url+'/supervisor/create', params,{headers: this.headers})
  }
  getIngeniero(idIngeniero): Observable<any> {
    return this._http.get(this.url+'/supervisor/read?empresa=1&codigo='+idIngeniero);
  }
  
  editIngeniero(ingeniero: IngenieroValuador):Observable<any>{
    var params = JSON.stringify(ingeniero)
    return this._http.put(this.url + '/supervisor/update', params, {headers: this.headers});
  }
 
  deleteIngeniero(idIngeniero):Observable<any>{
    return this._http.delete(this.url + '/supervisor/delete?empresa=1&codigo='+idIngeniero);
  }
}