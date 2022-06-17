import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/clientes";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  public obtenerUnCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${idCliente}`);
  }

  public crearCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API_URL, cliente);
  }

  public eliminarCliente(cliente_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${cliente_id}`);
  }

  public actualizarCliente(cliente: Cliente): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${cliente.cliente_id}`, cliente);
  }
}
