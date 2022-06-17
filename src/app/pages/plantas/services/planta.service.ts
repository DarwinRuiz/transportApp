import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Planta } from '../models/Planta';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/plantas";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodasLasPlantas(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.API_URL);
  }

  public obtenerUnaPlanta(idPlanta: number): Observable<Planta> {
    return this.http.get<Planta>(`${this.API_URL}/${idPlanta}`);
  }

  public crearPlanta(planta: Planta): Observable<Planta>{
    return this.http.post<Planta>(this.API_URL, planta);
  }

  public eliminarPlanta(planta_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${planta_id}`);
  }

  public actualizarPlanta(planta: Planta): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${planta.planta_id}`, planta);
  }
}
