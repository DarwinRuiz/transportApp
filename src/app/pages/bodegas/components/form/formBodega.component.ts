import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bodega } from '../../models/Bodega';
import { BodegaService } from '../../services/bodega.service';

@Component({
  selector: 'app-form',
  templateUrl: './formBodega.component.html',
  styleUrls: ['./formBodega.component.css'],
})
export class FormBodegaComponent implements OnInit {
  form!: FormGroup;
  bodega: Bodega = {
    bodega_direccion: '',
    bodega_contacto: '',
    bodega_encargado: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bodegaService: BodegaService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute
  ) {}

  private inicializarFormulario(): void {
    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.bodegaService.obtenerUnaBodega(id).subscribe((respuesta) => {
          this.bodega = respuesta;
          this.form = this.formBuilder.group({
            bodega_direccion: [
              this.bodega.bodega_direccion,
              Validators.required,
            ],
            bodega_contacto: [this.bodega.bodega_contacto, Validators.required],
            bodega_encargado: [
              this.bodega.bodega_encargado,
              Validators.required,
            ],
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      bodega_direccion: [this.bodega.bodega_direccion, Validators.required],
      bodega_contacto: [this.bodega.bodega_contacto, Validators.required],
      bodega_encargado: [this.bodega.bodega_encargado, Validators.required],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarBodega() {
    this.bodega.bodega_direccion = this.form.value.bodega_direccion;
    this.bodega.bodega_contacto = this.form.value.bodega_contacto;
    this.bodega.bodega_encargado = this.form.value.bodega_encargado;

    if (this.bodega.bodega_id === undefined) {
      this.bodegaService
        .crearBodega(this.bodega)
        .subscribe((respuesta) => {
          if (respuesta !== null || respuesta !== undefined) {
            this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }

          this.router.navigate(['/bodegas']);
        });
    } else {
      this.bodegaService
        .actualizarBodega(this.bodega)
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

          this.router.navigate(['/bodegas']);
        });
    }
  }
}
