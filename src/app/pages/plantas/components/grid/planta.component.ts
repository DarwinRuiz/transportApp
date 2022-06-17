import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Planta } from '../../models/Planta';
import { PlantaService } from '../../services/planta.service';
import { DepartamentoService } from 'src/app/pages/departamento/services/departamento.service';


@Component({
  selector: 'app-departamento',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements AfterViewInit, OnInit {

  plantas: Planta[] = []
  displayedColumns: string[] = ['planta_nombre', 'planta_procesamiento', 'planta_nombre_departamento', 'acciones'];
  dataSource = new MatTableDataSource(this.plantas);

  constructor(
    private plantaService: PlantaService,
    private _snackBar: MatSnackBar,
    private departamentoService: DepartamentoService
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private async cargarLosDatos() {
    this.plantaService.obtenerTodasLasPlantas()
    .subscribe( data => {
      this.plantas = data;

      this.plantas.forEach( elemento => {
        this.departamentoService.obtenerUnDepartamento(elemento.planta_departamento_id).subscribe(
          dato => {
            elemento.planta_nombre_departamento = dato.departamento_nombre;
          }
        )
      })

      this.dataSource.data = this.plantas;
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
    this.plantaService.eliminarPlanta(tipoVehi_id).subscribe(
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

