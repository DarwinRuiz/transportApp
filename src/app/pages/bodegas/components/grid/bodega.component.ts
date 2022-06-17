import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BodegaService } from '../../services/bodega.service';
import { Bodega } from '../../models/Bodega';


@Component({
  selector: 'app-departamento',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent implements AfterViewInit, OnInit {

  tiposVehiculos: Bodega[] = []
  displayedColumns: string[] = ['bodega_direccion', 'bodega_contacto', 'bodega_encargado', 'acciones'];
  dataSource = new MatTableDataSource(this.tiposVehiculos);

  constructor(
    private bodegaService: BodegaService,
    private _snackBar: MatSnackBar
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private cargarLosDatos() {
    this.bodegaService.obtenerTodosLasBodegas()
    .subscribe( data => {
      this.tiposVehiculos = data;
      this.dataSource.data = this.tiposVehiculos;
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

  eliminarRegistro(bodega_id: any){
    this.bodegaService.eliminarBodega(bodega_id).subscribe(
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

