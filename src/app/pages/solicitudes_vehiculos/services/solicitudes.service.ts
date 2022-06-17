import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Solicitud } from '../models/Solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/solicitudes-transporte";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodasLasSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.API_URL);
  }

  public obtenerUnaSolicitud(idSolicitud: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.API_URL}/${idSolicitud}`);
  }

  public crearSolicitud(solicitud: Solicitud): Observable<Solicitud>{
    return this.http.post<Solicitud>(this.API_URL, solicitud);
  }

  public eliminarSolicitud(solicitud_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${solicitud_id}`);
  }

  public actualizarSolicitud(solicitud: Solicitud): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${solicitud.solicitudTransp_id}`, solicitud);
  }
}
