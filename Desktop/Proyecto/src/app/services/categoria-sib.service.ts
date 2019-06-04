import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaSib } from '../models/Categoria-sib.model';

@Injectable()
export class CategoriaService {
  public url: string; 
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listPage(paginaNumero, paginaTam): Observable<any>{
    return this._http.get(`${this.url}/categoria/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`, {headers: this.headers});
  } 

  addCategoria(categoria: CategoriaSib): Observable<any> {
    let params =  JSON.stringify(categoria)  
    return this._http.post(this.url+'/categoria/create', params,{headers: this.headers})
  }
  
  getCategoria(idCategoria:string): Observable<any> {
    console.log(this.url+'/categoria/read?empresa=1&codigo='+idCategoria);
    return this._http.get(this.url+'/categoria/read?empresa=1&codigo='+idCategoria);
  }
  
  editCategoria(categoria: CategoriaSib):Observable<any>{
    var params = JSON.stringify(categoria)
    return this._http.put(this.url + '/categoria/update', params, {headers: this.headers});
  }
 
  deleteCategoria(idCategoria):Observable<any>{
    return this._http.delete(this.url + '/categoria/delete?empresa=1&codigo='+idCategoria);
  }
}