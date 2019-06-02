import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormasDeDesembolso } from '../models/formasDeDesembolso.model';

@Injectable()
export class FormasDeDesembolsoService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/formasdedesembolsos/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  }
  addFormasDesembolso(formasdedesembolso: FormasDeDesembolso): Observable<any> {
    let params = JSON.stringify(formasdedesembolso)
    return this._http.post(this.url+'/formasdedesembolsos/create', params,{headers: this.headers})
  }
  getFormasDesembolso(idFormasDesembolso): Observable<any>{
    return this._http.get(this.url+'/formasdedesembolsos/read?empresa=1&codigo='+idFormasDesembolso);
  }
  editFormasDesembolso(formasdedesembolso: FormasDeDesembolso): Observable<any> {
    var params = JSON.stringify(formasdedesembolso)
    return this._http.patch(this.url+'/formasdedesembolsos/update', params, {headers: this.headers});
  }
  deleteFormasDesembolso(idFormasDesembolso):Observable<any> {
    return this._http.delete(this.url+'/formasdedesembolsos/delete?empresa=1&codigo='+idFormasDesembolso);
  }
}