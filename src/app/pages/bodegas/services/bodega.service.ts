import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Bodega } from '../models/Bodega';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/bodegas";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLasBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.API_URL);
  }

  public obtenerUnaBodega(idBodega: number): Observable<Bodega> {
    return this.http.get<Bodega>(`${this.API_URL}/${idBodega}`);
  }

  public crearBodega(bodega: Bodega): Observable<Bodega>{
    return this.http.post<Bodega>(this.API_URL, bodega);
  }

  public eliminarBodega(bodega_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${bodega_id}`);
  }

  public actualizarBodega(bodega: Bodega): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${bodega.bodega_id}`, bodega);
  }
}
