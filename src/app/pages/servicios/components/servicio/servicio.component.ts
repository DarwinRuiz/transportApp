import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/pages/productos/services/producto.service';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/Servicio';
import { PlantaService } from 'src/app/pages/plantas/services/planta.service';
import { ClienteService } from 'src/app/pages/clientes/services/cliente.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  public servicios: Servicio[] = [];
  constructor(
    private servicioService: ServicioService,
    private productoService: ProductoService,
    private plantaService: PlantaService,
    private clienteService: ClienteService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.servicioService.obtenerTodosLosServicios().subscribe(
      data => {
        this.servicios = data;
        this.servicios.forEach( elemento => {
          this.productoService.obtenerUnProducto( elemento.servicio_producto_id )
          .subscribe( producto => {
            elemento.servicio_producto = producto.producto_nombre;
          })

          this.plantaService.obtenerUnaPlanta( elemento.servicio_planta_id )
          .subscribe( planta => {
            elemento.servicio_planta = planta.planta_nombre;
          })

          this.clienteService.obtenerUnCliente( elemento.servicio_cliente_id )
          .subscribe( cliente => {
            elemento.servicio_cliente = cliente.cliente_nombre;
          })

        })
      }
    )
  }

  eliminarRegistro( idServicio: any ) {
    this.servicioService.eliminarServicio(idServicio).subscribe(
      respuesta => {
        if( respuesta !== null || respuesta !== undefined){
          this._snackBar.open("Registro Eliminado con éxito!", "" , {
            duration: 1500,
            horizontalPosition: "center",
            verticalPosition: "bottom"
          })
          this.cargarDatos();
        }
      }
    )
  }
}
