import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instancia } from '../models/instancias.model';

 @Injectable()
  export class instanciasService{
      public url: string;
      public headers = new HttpHeaders().set('Content-Type','application/json');

      constructor(private _http: HttpClient){
          this.url  = GLOBAL.url;
      }
///LIST PAGE
    listPage(paginaNumero,paginaTam): Observable<any>{

          return this._http.get(`${this.url}/instancias/listPage?page =${paginaNumero} &size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`,{headers:this.headers});

      }
      ///CREATE
      addInstancia(instancias: Instancia):Observable<any>{
          let params = JSON.stringify(instancias)
          return this._http.post(this.url+'/instancias/create',params,{headers: this.headers})

      }
      ///READ
      getInstancia(idInstancias): Observable <any>{
          return this._http.get(this.url+'/instancias/read?empresa=1&codigo='+idInstancias);
      }

      ///UPDATE
      editInstancia(instancias: Instancia):Observable<any>{
          var params = JSON.stringify(instancias)
          return this._http.patch(this.url+'/instancias/update',params,{headers: this.headers});
      }
      ///DELETE

      deleteInstancia(idInstancias):Observable<any>{
          return this._http.delete(this.url+'/instancias/delete?empresa=1&codigo='+idInstancias);

      }
  }