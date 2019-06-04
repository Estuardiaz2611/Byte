import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstatusAvaluo } from '../models/estatus-avaluo.model';

@Injectable()
export class AvaluosService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/estatusAvaluo/listPage?page=${paginaNumero}&size=${paginaTam}asc&query=id.empresa==1`, {headers: this.headers});
  }

  addAvaluo(avaluo: EstatusAvaluo): Observable<any> {
    let params =  JSON.stringify(avaluo)  
    return this._http.post(this.url+'/estatusAvaluo/create', params,{headers: this.headers})
  }
  
  getAvaluo(idAvaluo): Observable<any> {
    return this._http.get(this.url+'/estatusAvaluo/read?empresa=1&codigo='+idAvaluo);
  }
  
  editAvaluo(avaluo: EstatusAvaluo):Observable<any>{
    var params = JSON.stringify(avaluo)
    return this._http.put(this.url + '/estatusAvaluo/update', params, {headers: this.headers});
  }
 
  deleteAvaluo(idAvaluo):Observable<any>{
    return this._http.delete(this.url + '/estatusAvaluo/delete?empresa=1&codigo='+idAvaluo);
  }
}