import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposVehiculosService } from '../../services/tiposVehiculos.service';
import { TiposVehiculos } from '../../models/TiposVehiculos';


@Component({
  selector: 'app-departamento',
  templateUrl: './tiposVehiculos.component.html',
  styleUrls: ['./tiposVehiculos.component.css']
})
export class TiposVehiculosComponent implements AfterViewInit, OnInit {

  tiposVehiculos: TiposVehiculos[] = []
  displayedColumns: string[] = ['tiposVehi_nombre', 'tiposVehi_capacidad', 'tiposVehi_medida', 'acciones'];
  dataSource = new MatTableDataSource(this.tiposVehiculos);

  constructor(
    private tiposVehiculosService: TiposVehiculosService,
    private _snackBar: MatSnackBar
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private cargarLosDatos() {
    this.tiposVehiculosService.obtenerTodosLosTiposVehiculos()
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

  eliminarRegistro(tipoVehi_id: any){
    this.tiposVehiculosService.eliminarTiposVehiculos(tipoVehi_id).subscribe(
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

