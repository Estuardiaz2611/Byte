import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Lugar } from '../models/lugar.model'; 
@Injectable() 
export class LugarService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  } 
  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/lugar/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addLugar(lugar: Lugar): Observable<any> {
    let params =  JSON.stringify(lugar)  
    return this._http.post(this.url+'/lugar/create', params,{headers: this.headers})
  }
  getLugar(idLugar): Observable<any> {
    return this._http.get(this.url+'/lugar/read?empresa=1&codigo='+idLugar);
  }
  
  editLugar(lugar: Lugar):Observable<any>{
    var params = JSON.stringify(lugar)
    return this._http.patch(this.url + '/lugar/update', params, {headers: this.headers});
  }
 
  deleteLugar(idLugar):Observable<any>{
    return this._http.delete(this.url + '/aseguradora/delete?empresa=1&codigo='+idLugar);
  }
} 