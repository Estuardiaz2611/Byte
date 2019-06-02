import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediodeContacto } from '../models/medio-de-contacto.model';

@Injectable()
export class MediosService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/medio/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addMedio(medio: MediodeContacto): Observable<any> {
    let params =  JSON.stringify(medio)  
    return this._http.post(this.url+'/medio/create', params,{headers: this.headers})
  }
  getMedio(idMedio): Observable<any> {
    return this._http.get(this.url+'/medio/read?empresa=1&codigo='+idMedio);
  }
  
  editMedio(medio: MediodeContacto):Observable<any>{
    var params = JSON.stringify(medio)
    return this._http.put(this.url + '/medio/update', params, {headers: this.headers});
  }
 
  deleteMedio(idMedio):Observable<any>{
    return this._http.delete(this.url + '/medio/delete?empresa=1&codigo='+idMedio);
  }
}