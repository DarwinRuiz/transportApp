import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { TiposVehiculos } from '../models/TiposVehiculos';

@Injectable({
  providedIn: 'root'
})
export class TiposVehiculosService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/tipos-vehiculos";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLosTiposVehiculos(): Observable<TiposVehiculos[]> {
    return this.http.get<TiposVehiculos[]>(this.API_URL);
  }

  public obtenerUnTiposVehiculos(idTiposVehiculos: number): Observable<TiposVehiculos> {
    return this.http.get<TiposVehiculos>(`${this.API_URL}/${idTiposVehiculos}`);
  }

  public crearTiposVehiculos(tiposVehiculos: TiposVehiculos): Observable<TiposVehiculos>{
    return this.http.post<TiposVehiculos>(this.API_URL, tiposVehiculos);
  }

  public eliminarTiposVehiculos(tiposVehiculos_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${tiposVehiculos_id}`);
  }

  public actualizarTiposVehiculos(tiposVehiculos: TiposVehiculos): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${tiposVehiculos.tiposVehi_id}`, tiposVehiculos);
  }
}
