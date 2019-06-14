import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormasDePago } from '../models/formasDePago.model';

@Injectable()
export class FormasDePagoService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/formaDePago/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addForma(forma: FormasDePago): Observable<any> {
    let params =  JSON.stringify(forma)  
    return this._http.post(this.url+'/formaDePago/create', params,{headers: this.headers})
  }
  getForma(idForma): Observable<any> {
    return this._http.get(this.url+'/formaDePago/read?empresa=1&codigo='+idForma);
  }
  
  editForma(forma: FormasDePago):Observable<any>{
    var params = JSON.stringify(forma)
    return this._http.put(this.url + '/formaDePago/update', params, {headers: this.headers});
  }
 
  deleteForma(idForma):Observable<any>{
    return this._http.delete(this.url + '/formaDePago/delete?empresa=1&codigo='+idForma);
  }
}