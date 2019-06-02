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
    return this._http.get(`${this.url}/formaDesembolso/listPage?page=${paginaNumero}&size=${paginaTam}`, {headers: this.headers});
  }
  addFormasDesembolso(formasdedesembolso: FormasDeDesembolso): Observable<any> {
    let params = JSON.stringify(formasdedesembolso)
    return this._http.post(this.url+'/formaDesembolso/create', params,{headers: this.headers})
  }
  getFormasDesembolso(idFormasDesembolso): Observable<any>{
    return this._http.get(this.url+'/formaDesembolso/read?codigo='+idFormasDesembolso);
  }
  editFormasDesembolso(formasdedesembolso: FormasDeDesembolso): Observable<any> {
    var params = JSON.stringify(formasdedesembolso)
    return this._http.patch(this.url+'/formaDesembolso/update', params, {headers: this.headers});
  }
  deleteFormasDesembolso(idFormasDesembolso):Observable<any> {
    return this._http.delete(this.url+'/formaDesembolso/delete?codigo='+idFormasDesembolso);
  }
}