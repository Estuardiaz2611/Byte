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
    return this._http.get(`${this.url}/formasdedesembolso/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  }
  addFormasDesembolso(formasdedesembolso: FormasDeDesembolso): Observable<any> {
    let params = JSON.stringify(formasdedesembolso)
    return this._http.post(this.url+'/formasdedesembolso/create', params,{headers: this.headers})
  }
  getFormasDesembolso(idFormasDesembolso): Observable<any>{
    return this._http.get(this.url+'/formasdedesembolso/read?empresa=1&')
  }
}