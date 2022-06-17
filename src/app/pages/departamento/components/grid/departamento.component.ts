import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/Departamento';


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements AfterViewInit, OnInit {

  departamentos: Departamento[] = []
  displayedColumns: string[] = ['departamento_nombre', 'departamento_numero', 'acciones'];
  dataSource = new MatTableDataSource(this.departamentos);

  constructor(
    private departamentoService: DepartamentoService,
    private _snackBar: MatSnackBar
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private cargarLosDatos() {
    this.departamentoService.obtenerTodosLosDepartamentos()
    .subscribe( data => {
      this.departamentos = data;
      this.dataSource.data = this.departamentos;
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

  eliminarRegistro(departamento_id: any){
    this.departamentoService.eliminarDepartamento(departamento_id).subscribe(
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

