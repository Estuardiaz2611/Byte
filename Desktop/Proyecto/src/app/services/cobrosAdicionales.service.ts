import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { CobrosAdicionales } from '../models/cobros-adicionales.model'; 

@Injectable()
export class CobrosAdicionalesService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/almacenadoras/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 
  addCobrosA(cobrosAdicionales: CobrosAdicionales): Observable<any> {
    let params =  JSON.stringify(cobrosAdicionales)  
    return this._http.post(this.url+'/almacenadoras/create', params,{headers: this.headers})
  }
  getCobrosA(idCobrosAdicionales): Observable<any> {
    return this._http.get(this.url+'/almacenadoras/read?empresa=1&codigo='+idCobrosAdicionales);
  }
  
  editCobrosA(cobrosAdicionales: CobrosAdicionales):Observable<any>{
    var params = JSON.stringify(cobrosAdicionales)
    return this._http.patch(this.url + '/almacenadoras/update', params, {headers: this.headers});
  }
 
  deleteCobrosA(idCobrosAdicionales):Observable<any>{
    return this._http.delete(this.url + '/almacenadoras/delete?empresa=1&codigo='+idCobrosAdicionales);
  }
}