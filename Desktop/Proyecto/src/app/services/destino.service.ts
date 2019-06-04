import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import {Destino} from '../models/destinos.model';

@Injectable()

export class DestinoService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/destino/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addDestino(destino: Destino): Observable<any> {
    let params =  JSON.stringify(destino)  
    return this._http.post(this.url+'/destino/create', params,{headers: this.headers})
  }
  getDestino(idDestino): Observable<any> {
    return this._http.get(this.url+'/destino/read?empresa=1&codigo='+idDestino);
  }
  
  editDestino(destino: Destino):Observable<any>{
    var params = JSON.stringify(destino)
    return this._http.put(this.url + '/destino/update', params, {headers: this.headers});
  }
 
  deleteDestino(idDestino):Observable<any>{
    return this._http.delete(this.url + '/destino/delete?empresa=1&codigo='+idDestino);
  }
}
