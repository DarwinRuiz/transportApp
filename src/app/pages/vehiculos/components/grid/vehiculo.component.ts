import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from '../../models/Vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';
import { PlantaService } from 'src/app/pages/plantas/services/planta.service';
import { TiposVehiculosService } from 'src/app/pages/tipos_vehiculos/services/tiposVehiculos.service';


@Component({
  selector: 'app-departamento',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements AfterViewInit, OnInit {

  vehiculos: Vehiculo[] = []
  displayedColumns: string[] = ['vehiculo_placa', 'vehiculo_modelo', 'vehiculo_linea', 'vehiculo_disponible', 'vehiculo_tipovehi_nombre', 'vehiculo_planta_nombre', 'acciones'];
  dataSource = new MatTableDataSource(this.vehiculos);

  constructor(
    private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar,
    private plantaService: PlantaService,
    private tipoVehiculoService: TiposVehiculosService
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private async cargarLosDatos() {
    this.vehiculoService.obtenerTodosLosVehiculos()
    .subscribe( data => {
      this.vehiculos = data;

      this.vehiculos.forEach( elemento => {
        this.plantaService.obtenerUnaPlanta(elemento.vehiculo_planta_id).subscribe(
          dato => {
            elemento.vehiculo_planta_nombre = dato.planta_nombre;
          }
        )
      })

      this.vehiculos.forEach( elemento => {
        this.tipoVehiculoService.obtenerUnTiposVehiculos(elemento.vehiculo_tiposvehi_id).subscribe(
          dato => {
            elemento.vehiculo_tipovehi_nombre = dato.tiposVehi_nombre;
          }
        )
      })

      this.dataSource.data = this.vehiculos;
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

  eliminarRegistro(vehiculo_id: any){
    this.vehiculoService.eliminarVehiculo(vehiculo_id).subscribe(
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

