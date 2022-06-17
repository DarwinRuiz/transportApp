import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-departamento',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements AfterViewInit, OnInit {

  clientes: Cliente[] = []
  displayedColumns: string[] = ['cliente_nombre', 'cliente_pais', 'cliente_representante_legal', 'cliente_telefono', 'cliente_nit', 'acciones'];
  dataSource = new MatTableDataSource(this.clientes);

  constructor(
    private clientesService: ClienteService,
    private _snackBar: MatSnackBar
  ){ }


  ngOnInit(): void {
    this.cargarLosDatos();
  }
 
  private cargarLosDatos() {
    this.clientesService.obtenerTodosLosClientes()
    .subscribe( data => {
      this.clientes = data;
      this.dataSource.data = this.clientes;
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

  eliminarRegistro(cliente_id: any){
    this.clientesService.eliminarCliente(cliente_id).subscribe(
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

