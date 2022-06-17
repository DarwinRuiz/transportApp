import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaProducto } from '../../models/CategoriaProducto';
import { CategoriaProductoService } from '../../services/categoriaProducto.service';
import { BodegaService } from 'src/app/pages/bodegas/services/bodega.service';


@Component({
  selector: 'app-departamento',
  templateUrl: './categoriaProducto.component.html',
  styleUrls: ['./categoriaProducto.component.css']
})
export class CategoriaProductoComponent implements AfterViewInit, OnInit {

  categoriasProductos: CategoriaProducto[] = []
  displayedColumns: string[] = ['categoriaProd_nombre', 'categoriaProd_bodega_nombre', 'acciones'];
  dataSource = new MatTableDataSource(this.categoriasProductos);

  constructor(
    private categoriaProductoService: CategoriaProductoService,
    private _snackBar: MatSnackBar,
    private bodegaService: BodegaService
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private async cargarLosDatos() {
    this.categoriaProductoService.obtenerTodasLasCategoriaProductos()
    .subscribe( data => {
      this.categoriasProductos = data;

      this.categoriasProductos.forEach( elemento => {
        this.bodegaService.obtenerUnaBodega(elemento.categoriaProd_bodega_id).subscribe(
          dato => {
            elemento.categoriaProd_bodega_nombre = dato.bodega_direccion;
          }
        )
      })

      this.dataSource.data = this.categoriasProductos;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminarRegistro(categoriaProducto_id: any){
    this.categoriaProductoService.eliminarCategoriaProducto(categoriaProducto_id).subscribe(
      respuesta => {
        if( respuesta !== null || respuesta !== undefined){
          this._snackBar.open("Registro Eliminado con éxito!", "" , {
            duration: 1500,
            horizontalPosition: "center",
            verticalPosition: "bottom"
          })
          this.cargarLosDatos();
        }
      }
    )
  }
}

