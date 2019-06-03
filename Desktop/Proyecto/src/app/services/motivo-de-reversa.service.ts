import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotivoDeReversa } from '../models/motivo-de-reversa.model';

@Injectable()
export class MotivoDeReversaService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/motivoReversionPago/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addMotivo(motivodereversa: MotivoDeReversa): Observable<any> {
    let params =  JSON.stringify(motivodereversa)  
    return this._http.post(this.url+'/motivoReversionPago/create', params,{headers: this.headers})
  }
  getMotivo(idMotivoReversa): Observable<any> {
    return this._http.get(this.url+'/motivoReversionPago/read?empresa=1&codigo='+idMotivoReversa);
  }
  
  editMotivo(motivodereversa: MotivoDeReversa):Observable<any>{
    var params = JSON.stringify(motivodereversa)
    return this._http.patch(this.url + '/motivoReversionPago/update', params, {headers: this.headers});
  }
 
  deleteMotivo(idMotivoReversa):Observable<any>{
    return this._http.delete(this.url + '/motivoReversionPago/delete?empresa=1&codigo='+idMotivoReversa);
  }

}
