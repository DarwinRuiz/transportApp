import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/productos";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }

  public obtenerUnProducto(idProducto: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/${idProducto}`);
  }

  public crearProducto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.API_URL, producto);
  }

  public eliminarProducto(producto_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${producto_id}`);
  }

  public actualizarProducto(producto: Producto): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${producto.producto_id}`, producto);
  }
}
