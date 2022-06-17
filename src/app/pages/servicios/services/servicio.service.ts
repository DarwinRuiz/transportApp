import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Servicio } from '../models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/servicios";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLosServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.API_URL);
  }

  public obtenerUnServicio(idServicio: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.API_URL}/${idServicio}`);
  }

  public crearServicio(servicio: Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(this.API_URL, servicio);
  }

  public eliminarServicio(servicio_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${servicio_id}`);
  }

  public actualizarServicio(servicio: Servicio): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${servicio.servicio_id}`, servicio);
  }
}
