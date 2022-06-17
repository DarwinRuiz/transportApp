import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlantaService } from 'src/app/pages/plantas/services/planta.service';
import { Planta } from 'src/app/pages/plantas/models/Planta';
import { Producto } from '../../models/Producto';
import { CategoriaProducto } from 'src/app/pages/categorias_productos/models/CategoriaProducto';
import { ProductoService } from '../../services/producto.service';
import { CategoriaProductoService } from 'src/app/pages/categorias_productos/services/categoriaProducto.service';

@Component({
  selector: 'app-form',
  templateUrl: './formProducto.component.html',
  styleUrls: ['./formProducto.component.css'],
})
export class FormProductoComponent implements OnInit {
  form!: FormGroup;
  producto: Producto = {
    producto_nombre: '',
    producto_descripcion: '',
    producto_cantidad: 0,
    producto_precio: 0,
    producto_categoriaProd_id: 0,
    producto_planta_id: 0,
  };

  categoriasProductos: CategoriaProducto[] = [];

  plantas: Planta[] = [];

  departamentosControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private categoriaProductoService: CategoriaProductoService,
    private plantaService: PlantaService
  ) {}

  private inicializarFormulario(): void {
    this.categoriaProductoService
      .obtenerTodasLasCategoriaProductos()
      .subscribe((data) => {
        this.categoriasProductos = data;
      });

    this.plantaService.obtenerTodasLasPlantas().subscribe((data) => {
      this.plantas = data;
    });

    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.productoService.obtenerUnProducto(id).subscribe((respuesta) => {
          this.producto = respuesta;
          this.form = this.formBuilder.group({
            producto_nombre: [
              this.producto.producto_nombre,
              Validators.required,
            ],
            producto_descripcion: [
              this.producto.producto_descripcion,
              Validators.required,
            ],
            producto_cantidad: [
              this.producto.producto_cantidad,
              Validators.required,
            ],
            producto_precio: [
              this.producto.producto_precio,
              Validators.required,
            ],
            producto_categoriaProd_id: [
              this.producto.producto_categoriaProd_id,
              Validators.required,
            ],
            producto_planta_id: [
              this.producto.producto_planta_id,
              Validators.required,
            ],
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      producto_nombre: [this.producto.producto_nombre, Validators.required],
      producto_descripcion: [
        this.producto.producto_descripcion,
        Validators.required,
      ],
      producto_cantidad: [this.producto.producto_cantidad, Validators.required],
      producto_precio: [this.producto.producto_precio, Validators.required],
      producto_categoriaProd_id: [
        this.producto.producto_categoriaProd_id,
        Validators.required,
      ],
      producto_planta_id: [
        this.producto.producto_planta_id,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarVehiculo() {
    this.producto.producto_nombre = this.form.value.producto_nombre;
    this.producto.producto_descripcion = this.form.value.producto_descripcion;
    this.producto.producto_cantidad = this.form.value.producto_cantidad;
    this.producto.producto_precio = this.form.value.producto_precio;
    this.producto.producto_categoriaProd_id =
      this.form.value.producto_categoriaProd_id;
    this.producto.producto_planta_id = this.form.value.producto_planta_id;

    if (this.producto.producto_id === undefined) {
      if (
        this.producto.producto_categoriaProd_id !== 0 ||
        this.producto.producto_planta_id !== 0
      ) {
        this.productoService
          .crearProducto(this.producto)
          .subscribe((respuesta) => {
            if (respuesta !== null || respuesta !== undefined) {
              this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }

            this.router.navigate(['/productos']);
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
      this.productoService
        .actualizarProducto(this.producto)
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

          this.router.navigate(['/productos']);
        });
    }
  }
}
