import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../models/Solicitud';
import { SolicitudService } from '../../services/solicitudes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/pages/productos/services/producto.service';
import { BodegaService } from 'src/app/pages/bodegas/services/bodega.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  public solicitudes: Solicitud[] = [];
  constructor(
    private solicitudService: SolicitudService,
    private productoService: ProductoService,
    private bodegaService: BodegaService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.solicitudService.obtenerTodasLasSolicitudes().subscribe(
      data => {
        this.solicitudes = data;
        this.solicitudes.forEach( elemento => {
          this.productoService.obtenerUnProducto( elemento.solicitudTransp_producto_id )
          .subscribe( producto => {
            elemento.solicitudTransp_producto = producto.producto_nombre;
          })

          this.bodegaService.obtenerUnaBodega( elemento.solicitudTransp_bodega_id )
          .subscribe( bodega => {
            elemento.solicitudTransp_bodega = bodega.bodega_direccion;
          })

        })
      }
    )
  }

  eliminarRegistro( idSolicitud: any ) {
    this.solicitudService.eliminarSolicitud(idSolicitud).subscribe(
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
