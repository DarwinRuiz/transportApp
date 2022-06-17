import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaProducto } from '../../models/CategoriaProducto';
import { Bodega } from 'src/app/pages/bodegas/models/Bodega';
import { CategoriaProductoService } from '../../services/categoriaProducto.service';
import { BodegaService } from 'src/app/pages/bodegas/services/bodega.service';

@Component({
  selector: 'app-form',
  templateUrl: './formCategoriaProducto.component.html',
  styleUrls: ['./formCategoriaProducto.component.css'],
})
export class FormCategoriaProductoComponent implements OnInit {
  form!: FormGroup;
  categoriaProducto: CategoriaProducto = {
    categoriaProd_nombre: '',
    categoriaProd_bodega_id: 0,
  };

  bodegas: Bodega[] = [];

  departamentosControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoriaProductoService: CategoriaProductoService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private bodegaService: BodegaService
  ) {}

  private inicializarFormulario(): void {
    this.bodegaService.obtenerTodosLasBodegas().subscribe((data) => {
      this.bodegas = data;
    });

    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.categoriaProductoService
          .obtenerUnaCategoriaProducto(id)
          .subscribe((respuesta) => {
            this.categoriaProducto = respuesta;
            this.form = this.formBuilder.group({
              categoriaProd_nombre: [
                this.categoriaProducto.categoriaProd_nombre,
                Validators.required,
              ],
              categoriaProd_bodega_id: [
                this.categoriaProducto.categoriaProd_bodega_id,
                Validators.required,
              ],
            });
          });
      }
    });

    this.form = this.formBuilder.group({
      categoriaProd_nombre: [
        this.categoriaProducto.categoriaProd_nombre,
        Validators.required,
      ],
      categoriaProd_bodega_id: [
        this.categoriaProducto.categoriaProd_bodega_id,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarCategoriaProducto() {
    this.categoriaProducto.categoriaProd_nombre = this.form.value.categoriaProd_nombre.toUpperCase();
    this.categoriaProducto.categoriaProd_bodega_id =
      this.form.value.categoriaProd_bodega_id;

    if (this.categoriaProducto.categoriaProd_id === undefined) {
      if (this.categoriaProducto.categoriaProd_bodega_id !== 0) {
        this.categoriaProductoService
          .crearCategoriaProducto(this.categoriaProducto)
          .subscribe((respuesta) => {
            if (respuesta !== null || respuesta !== undefined) {
              this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }

            this.router.navigate(['/categorias-productos']);
          });
      } else {
        this._snackBar.open('Debe seleccionar una Bodega', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    } else {
      this.categoriaProductoService
        .actualizarCategoriaProducto(this.categoriaProducto)
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

          this.router.navigate(['/categorias-productos']);
        });
    }
  }
}
