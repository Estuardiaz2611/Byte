import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aseguradora } from '../models/aseguradoras.model'; 
@Injectable()
export class AseguradoraService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  } 
  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/aseguradora/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addAseguradora(aseguradora: Aseguradora): Observable<any> {
    let params =  JSON.stringify(aseguradora)  
    return this._http.post(this.url+'/aseguradora/create', params,{headers: this.headers})
  }
  getAseguradora(idAseguradora): Observable<any> {
    return this._http.get(this.url+'/aseguradora/read?empresa=1&codigo='+idAseguradora);
  }
  
  editAseguradora(aseguradora: Aseguradora):Observable<any>{
    var params = JSON.stringify(aseguradora)
    return this._http.patch(this.url + '/aseguradora/update', params, {headers: this.headers});
  }
 
  deleteAseguradora(idAseguradora):Observable<any>{
    return this._http.delete(this.url + '/aseguradora/delete?empresa=1&codigo='+idAseguradora);
  }
}