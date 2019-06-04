import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poder } from '../models/poder.model';

 @Injectable()
  export class poderService{
      public url: string;
      public headers = new HttpHeaders().set('Content-Type','application/json');

      constructor(private _http: HttpClient){
          this.url  = GLOBAL.url;
      }
///LIST PAGE
      listPage(paginaNumero,paginaTam): Observable<any>{
          return this._http.get(`${this.url}/poder/listPage?page =${paginaNumero} &size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`,{headers:this.headers});

      }

      ///CREATE
      addPoder(poder: Poder):Observable<any>{
          let params = JSON.stringify(poder)
          return this._http.post(this.url+'/poder/create',params,{headers: this.headers})

      }
      ///READ
      getPoder(idPoder): Observable <any>{
          return this._http.get(this.url+'/poder/read?empresa=1&codigo='+idPoder);
      }

      ///UPDATE
      editPoder(poder: Poder):Observable<any>{
          var params = JSON.stringify(poder)
          return this._http.put(this.url+'/poder/update',params,{headers: this.headers});
      }
      ///DELETE

      deletePoder(idPoder):Observable<any>{
          return this._http.delete(this.url+'/poder/delete?empresa=1&codigo='+idPoder);

      }
  }