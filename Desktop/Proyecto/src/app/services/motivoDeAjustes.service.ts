import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotivoDeAjuste } from '../models/motivosDeAjustes.model';

@Injectable()
export class MotivoDeAjusteService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  
  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/motivoAjuste/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  }

  addMotivoAjuste(motivoAjuste: MotivoDeAjuste): Observable<any> {
    let params =  JSON.stringify(motivoAjuste)  
    return this._http.post(this.url+'/motivoAjuste/create', params,{headers: this.headers})
  }

  getMotivoAjuste(idMotivoAjuste): Observable<any> {
    return this._http.get(this.url+'/motivoAjuste/read?empresa=1&codigo='+idMotivoAjuste);
  }

  editMotivoAjuste(motivoAjuste: MotivoDeAjuste):Observable<any>{
    var params = JSON.stringify(motivoAjuste)
    return this._http.put(this.url + '/motivoAjuste/update', params, {headers: this.headers});
  }

  deleteMotivoAjuste(idMotivoAjuste):Observable<any>{
    return this._http.delete(this.url + '/motivoAjuste/delete?empresa=1&codigo='+idMotivoAjuste);
  }
}