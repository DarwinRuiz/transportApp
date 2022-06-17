import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Vehiculo } from '../models/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/vehiculos";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLosVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.API_URL);
  }

  public obtenerUnVehiculo(idVehiculo: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.API_URL}/${idVehiculo}`);
  }

  public crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(this.API_URL, vehiculo);
  }

  public eliminarVehiculo(vehiculo_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${vehiculo_id}`);
  }

  public actualizarVehiculo(vehiculo: Vehiculo): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${vehiculo.vehiculo_id}`, vehiculo);
  }
}
