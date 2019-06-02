import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Almacenadora } from '../models/almacenadoras.model';

@Injectable()
export class AlmacenadorasService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/almacenadoras/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addAlmacenadora(almacenadora: Almacenadora): Observable<any> {
    let params =  JSON.stringify(almacenadora)  
    return this._http.post(this.url+'/almacenadoras/create', params,{headers: this.headers})
  }
  getAlmacenadora(idAlmacenadora): Observable<any> {
    return this._http.get(this.url+'/almacenadoras/read?empresa=1&codigo='+idAlmacenadora);
  }
  
  editAlmacenadora(almacenadora: Almacenadora):Observable<any>{
    var params = JSON.stringify(almacenadora)
    return this._http.patch(this.url + '/almacenadoras/update', params, {headers: this.headers});
  }
 
  deleteAlmacenadora(idAlmacenadora):Observable<any>{
    return this._http.delete(this.url + '/almacenadoras/delete?empresa=1&codigo='+idAlmacenadora);
  }
}