import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/pages/productos/services/producto.service';
import { BodegaService } from 'src/app/pages/bodegas/services/bodega.service';
import { SolicitudService } from '../../services/solicitudes.service';
import { Producto } from 'src/app/pages/productos/models/Producto';
import { Bodega } from 'src/app/pages/bodegas/models/Bodega';
import { Solicitud } from '../../models/Solicitud';

@Component({
  selector: 'app-form',
  templateUrl: './formSolicitud.component.html',
  styleUrls: ['./formSolicitud.component.css'],
})
export class FormSolicitudComponent implements OnInit {
  form!: FormGroup;
  solicitud: Solicitud = {
    solicitudTransp_destino: "",
    solicitudTransp_peso: "",
    solicitudTransp_emisor: "",
    solicitudTransp_receptor: "",
    solicitudTransp_cantidad_productos: 0,
    solicitudTransp_producto_id: 0,
    solicitudTransp_bodega_id: 0
  };

  productos: Producto[] = [];

  bodegas: Bodega[] = [];

  departamentosControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private solicitudService: SolicitudService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private productoService: ProductoService,
    private bodegaService: BodegaService
  ) {}

  private inicializarFormulario(): void {
    this.productoService
      .obtenerTodosLosProductos()
      .subscribe((data) => {
        this.productos = data;
      });

    this.bodegaService.obtenerTodosLasBodegas().subscribe((data) => {
      this.bodegas = data;
    });

    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.solicitudService.obtenerUnaSolicitud(id).subscribe((respuesta) => {
          this.solicitud = respuesta;
          this.form = this.formBuilder.group({
            solicitudTransp_destino: [
              this.solicitud.solicitudTransp_destino,
              Validators.required,
            ],
            solicitudTransp_peso: [
              this.solicitud.solicitudTransp_peso,
              Validators.required,
            ],
            solicitudTransp_emisor: [
              this.solicitud.solicitudTransp_emisor,
              Validators.required,
            ],
            solicitudTransp_receptor: [
              this.solicitud.solicitudTransp_receptor,
              Validators.required,
            ],
            solicitudTransp_cantidad_productos: [
              this.solicitud.solicitudTransp_cantidad_productos,
              Validators.required,
            ],
            solicitudTransp_producto_id: [
              this.solicitud.solicitudTransp_producto_id,
              Validators.required,
            ],
            solicitudTransp_bodega_id: [
              this.solicitud.solicitudTransp_bodega_id,
              Validators.required,
            ]
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      solicitudTransp_destino: [
        this.solicitud.solicitudTransp_destino,
        Validators.required,
      ],
      solicitudTransp_peso: [
        this.solicitud.solicitudTransp_peso,
        Validators.required,
      ],
      solicitudTransp_emisor: [
        this.solicitud.solicitudTransp_emisor,
        Validators.required,
      ],
      solicitudTransp_receptor: [
        this.solicitud.solicitudTransp_receptor,
        Validators.required,
      ],
      solicitudTransp_cantidad_productos: [
        this.solicitud.solicitudTransp_cantidad_productos,
        Validators.required,
      ],
      solicitudTransp_producto_id: [
        this.solicitud.solicitudTransp_producto_id,
        Validators.required,
      ],
      solicitudTransp_bodega_id: [
        this.solicitud.solicitudTransp_bodega_id,
        Validators.required,
      ]
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarSolicitud() {
    this.solicitud.solicitudTransp_destino = this.form.value.solicitudTransp_destino;
    this.solicitud.solicitudTransp_peso = this.form.value.solicitudTransp_peso;
    this.solicitud.solicitudTransp_emisor = this.form.value.solicitudTransp_emisor;
    this.solicitud.solicitudTransp_receptor = this.form.value.solicitudTransp_receptor;
    this.solicitud.solicitudTransp_cantidad_productos =
      this.form.value.solicitudTransp_cantidad_productos;
    this.solicitud.solicitudTransp_producto_id = this.form.value.solicitudTransp_producto_id;
    this.solicitud.solicitudTransp_bodega_id = this.form.value.solicitudTransp_bodega_id;

    if (this.solicitud.solicitudTransp_id === undefined) {
      if (
        this.solicitud.solicitudTransp_bodega_id !== 0 ||
        this.solicitud.solicitudTransp_producto_id !== 0
      ) {
        this.solicitudService
          .crearSolicitud(this.solicitud)
          .subscribe((respuesta) => {
            if (respuesta !== null || respuesta !== undefined) {
              this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }

            this.router.navigate(['/solicitudes-transporte']);
          });
      } else {
        this._snackBar.open(
          'Debe seleccionar todos los elementos del formulario',
          '',
          {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    } else {
      this.solicitudService
        .actualizarSolicitud(this.solicitud)
        .subscribe((respuesta) => {
          if (respuesta !== null || respuesta !== undefined) {
            this._snackBar.open(
              'El Registro ha sido Actualizado con éxito!',
              '',
              {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
          }

          this.router.navigate(['/solicitudes-transporte']);
        });
    }
  }
}
