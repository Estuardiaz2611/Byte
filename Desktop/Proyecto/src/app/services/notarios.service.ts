import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notarios } from '../models/notarios.model';

@Injectable()

export class notariosService{
    public url: string;
    public headers = new HttpHeaders().set('Content-Type','application/json');


    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;

    }
    listPage(paginaNumero, paginaTam): Observable<any>{
        return  this._http.get(`${this.url}/abogadosNotarios/listPage?page=${paginaNumero}&size=${paginaTam}&sort=id.codigo,asc&query=id.empresa==1`,{headers: this.headers});       
    }
    addNotarios(notarios: Notarios):Observable<any>{
        let params = JSON.stringify(notarios)
        return this._http.post(this.url+'/abogadosNotarios/create',params,{headers: this.headers})
    }
    getNotarios(idNotarios): Observable<any>{
        return this._http.get(this.url+'/abogadosNotarios/read?codigo='+idNotarios);
    }
    editNotarios(notarios:Notarios):Observable <any>{
        var params = JSON.stringify(notarios)
        return this._http.put(this.url+'/abogadosNotarios/update',params,{headers: this.headers});
    }
    deleteNotarios(idNotarios): Observable<any>{
        return this._http.delete(this.url+'/abogadosNotarios/delete?codigo='+idNotarios);
        
    }
}