import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Departamento } from '../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/departamentos";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLosDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.API_URL);
  }

  public obtenerUnDepartamento(idDepartamento: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.API_URL}/${idDepartamento}`);
  }

  public crearDepartamento(departamento: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(this.API_URL, departamento);
  }

  public eliminarDepartamento(departamento_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${departamento_id}`);
  }

  public actualizarDepartamento(departamento: Departamento): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${departamento.departamento_id}`, departamento);
  }
}
