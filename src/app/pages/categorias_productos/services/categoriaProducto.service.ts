import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoriaProducto } from '../models/CategoriaProducto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

 private API_URL: string = "https://transportsrv.azurewebsites.net/api/categorias_productos";

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodasLasCategoriaProductos(): Observable<CategoriaProducto[]> {
    return this.http.get<CategoriaProducto[]>(this.API_URL);
  }

  public obtenerUnaCategoriaProducto(idCategoriaProducto: number): Observable<CategoriaProducto> {
    return this.http.get<CategoriaProducto>(`${this.API_URL}/${idCategoriaProducto}`);
  }

  public crearCategoriaProducto(categoriaProducto: CategoriaProducto): Observable<CategoriaProducto>{
    return this.http.post<CategoriaProducto>(this.API_URL, categoriaProducto);
  }

  public eliminarCategoriaProducto(categoriaProducto_id: number): Observable<string> {
    return this.http.delete<string>(`${this.API_URL}/${categoriaProducto_id}`);
  }

  public actualizarCategoriaProducto(categoriaProducto: CategoriaProducto): Observable<string> {
    return this.http.put<string>(`${this.API_URL}/${categoriaProducto.categoriaProd_id}`, categoriaProducto);
  }
}
