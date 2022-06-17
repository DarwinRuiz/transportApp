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
import { Producto } from 'src/app/pages/productos/models/Producto';
import { Servicio } from '../../models/Servicio';
import { Planta } from 'src/app/pages/plantas/models/Planta';
import { Cliente } from 'src/app/pages/clientes/models/Cliente';
import { ServicioService } from '../../services/servicio.service';
import { PlantaService } from 'src/app/pages/plantas/services/planta.service';
import { ClienteService } from 'src/app/pages/clientes/services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './formServicio.component.html',
  styleUrls: ['./formServicio.component.css'],
})
export class FormServicioComponent implements OnInit {
  form!: FormGroup;
  servicio: Servicio = {
    servicio_tipo: '',
    servicio_fecha_entrega: '',
    servicio_precio: 0,
    servicio_planta_id: 0,
    servicio_producto_id: 0,
    servicio_cliente_id: 0,
  };

  productos: Producto[] = [];

  plantas: Planta[] = [];

  clientes: Cliente[] = [];

  departamentosControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servicioService: ServicioService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private productoService: ProductoService,
    private plantaService: PlantaService,
    private clienteService: ClienteService
  ) {}

  private inicializarFormulario(): void {
    this.productoService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data;
    });

    this.plantaService.obtenerTodasLasPlantas().subscribe((data) => {
      this.plantas = data;
    });

    this.clienteService.obtenerTodosLosClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.servicioService.obtenerUnServicio(id).subscribe((respuesta) => {
          this.servicio = respuesta;
          this.form = this.formBuilder.group({
            servicio_tipo: [this.servicio.servicio_tipo, Validators.required],
            servicio_fecha_entrega: [
              this.servicio.servicio_fecha_entrega,
              Validators.required,
            ],
            servicio_precio: [
              this.servicio.servicio_precio,
              Validators.required,
            ],
            servicio_planta_id: [
              this.servicio.servicio_planta_id,
              Validators.required,
            ],
            servicio_producto_id: [
              this.servicio.servicio_producto_id,
              Validators.required,
            ],
            servicio_cliente_id: [
              this.servicio.servicio_cliente_id,
              Validators.required,
            ],
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      servicio_tipo: [this.servicio.servicio_tipo, Validators.required],
      servicio_fecha_entrega: [
        this.servicio.servicio_fecha_entrega,
        Validators.required,
      ],
      servicio_precio: [this.servicio.servicio_precio, Validators.required],
      servicio_planta_id: [
        this.servicio.servicio_planta_id,
        Validators.required,
      ],
      servicio_producto_id: [
        this.servicio.servicio_producto_id,
        Validators.required,
      ],
      servicio_cliente_id: [
        this.servicio.servicio_cliente_id,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarServicio() {
    this.servicio.servicio_tipo = this.form.value.servicio_tipo;
    this.servicio.servicio_fecha_entrega =
      this.form.value.servicio_fecha_entrega;
    this.servicio.servicio_precio = this.form.value.servicio_precio;
    this.servicio.servicio_planta_id = this.form.value.servicio_planta_id;
    this.servicio.servicio_producto_id = this.form.value.servicio_producto_id;
    this.servicio.servicio_cliente_id = this.form.value.servicio_cliente_id;

    if (this.servicio.servicio_id === undefined) {
      if (
        this.servicio.servicio_cliente_id !== 0 ||
        this.servicio.servicio_producto_id !== 0 ||
        this.servicio.servicio_planta_id !== 0
      ) {
        this.servicioService
          .crearServicio(this.servicio)
          .subscribe((respuesta) => {
            if (respuesta !== null || respuesta !== undefined) {
              this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }

            this.router.navigate(['/servicios']);
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
      this.servicioService
        .actualizarServicio(this.servicio)
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

          this.router.navigate(['/servicios']);
        });
    }
  }
}
