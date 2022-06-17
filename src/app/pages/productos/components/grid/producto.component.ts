import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlantaService } from 'src/app/pages/plantas/services/planta.service';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { CategoriaProductoService } from 'src/app/pages/categorias_productos/services/categoriaProducto.service';


@Component({
  selector: 'app-departamento',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements AfterViewInit, OnInit {

  productos: Producto[] = []
  displayedColumns: string[] = ['producto_nombre', 'producto_descripcion', 'producto_cantidad', 'producto_precio', 'producto_categoria_nombre', 'producto_planta_nombre', 'acciones'];
  dataSource = new MatTableDataSource(this.productos);

  constructor(
    private productoService: ProductoService,
    private _snackBar: MatSnackBar,
    private plantaService: PlantaService,
    private categoriaProductoService: CategoriaProductoService
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private async cargarLosDatos() {
    this.productoService.obtenerTodosLosProductos()
    .subscribe( data => {
      this.productos = data;

      this.productos.forEach( elemento => {
        this.plantaService.obtenerUnaPlanta(elemento.producto_planta_id).subscribe(
          dato => {
            elemento.producto_planta_nombre = dato.planta_nombre;
          }
        )
      })

      this.productos.forEach( elemento => {
        this.categoriaProductoService.obtenerUnaCategoriaProducto(elemento.producto_categoriaProd_id).subscribe(
          dato => {
            elemento.producto_categoria_nombre = dato.categoriaProd_nombre;
          }
        )
      })

      this.dataSource.data = this.productos;
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

  eliminarRegistro(producto_id: any){
    this.productoService.eliminarProducto(producto_id).subscribe(
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

