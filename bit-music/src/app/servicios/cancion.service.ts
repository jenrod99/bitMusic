import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  url = "http://localhost:3877/api/";

  constructor(
    private _http: HttpClient
  ) { }

  crearCancion(cancion){
    let params = JSON.stringify(cancion);
    let options = {
      headers: new HttpHeaders(
        { 'Content-type':'aplication/json'})};
    return this._http.post(
      this.url + 'cancion',
      params,
      options      
    ).pipe(map(res => res));
  }

  eliminarCancion(id){
    let options = {
      headers: new HttpHeaders(
        { 'Content-type':'aplication/json'})};
    return this._http.delete(
      this.url + 'cancion/' + id,
      options      
    ).pipe(map(res => res));
  }

  cargarFicheroCancion(file: File, id){
    let formData = new FormData();
    formData.append('file', file);
    return this._http.post(
      this.url + '/cargar-fichero-cancion/' + id,
      formData      
    ).pipe(map(res => res));
  }


}

/* crearCancion -> post
eliminarCancion -> delete
cargarFicheroCancion -> post */