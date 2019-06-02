import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstatusGarantiaReal } from '../models/estatus-garantias-reales.model';

@Injectable()
export class EstatusService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/statusGarantiaReal/listPage?page=${paginaNumero}&size=${paginaTam}`, {headers: this.headers});
  } 

  addEstatus(estatus: EstatusGarantiaReal): Observable<any> {
    let params =  JSON.stringify(estatus)  
    return this._http.post(this.url+'/statusGarantiaReal/create', params,{headers: this.headers})
  }
  
  getEstatus(idEstatus:string): Observable<any> {
    console.log(this.url+'/statusGarantiaReal/read?codigo='+idEstatus);
    return this._http.get(this.url+'/statusGarantiaReal/read?codigo='+idEstatus);
  }
  
  editEstatus(estatus: EstatusGarantiaReal):Observable<any>{
    var params = JSON.stringify(estatus)
    return this._http.put(this.url + '/statusGarantiaReal/update', params, {headers: this.headers});
  }
 
  deleteEstatus(idEstatus):Observable<any>{
    return this._http.delete(this.url + '/statusGarantiaReal/delete?codigo='+idEstatus);
  }
}