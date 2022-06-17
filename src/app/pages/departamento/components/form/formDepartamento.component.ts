import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/Departamento';

@Component({
  selector: 'app-form',
  templateUrl: './formDepartamento.component.html',
  styleUrls: ['./formDepartamento.component.css'],
})
export class FormDepartamentoComponent implements OnInit {
  form!: FormGroup;
  departamento: Departamento = {
    departamento_nombre: '',
    departamento_numero: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private departamentoService: DepartamentoService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute
  ) {}

  private inicializarFormulario(): void {
    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.departamentoService
          .obtenerUnDepartamento(id)
          .subscribe((respuesta) => {
            this.departamento = respuesta;
            this.form = this.formBuilder.group({
              departamento_nombre: [
                this.departamento.departamento_nombre,
                Validators.required,
              ],
              departamento_numero: [
                this.departamento.departamento_numero,
                Validators.required,
              ],
            });
          });
      }
    });

    this.form = this.formBuilder.group({
      departamento_nombre: [
        this.departamento.departamento_nombre,
        Validators.required,
      ],
      departamento_numero: [
        this.departamento.departamento_numero,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarDepartamento() {
    this.departamento.departamento_nombre =
      this.form.value.departamento_nombre.toUpperCase();
    this.departamento.departamento_numero = this.form.value.departamento_numero;

    if (this.departamento.departamento_id === undefined) {
      this.departamentoService
        .crearDepartamento(this.departamento)
        .subscribe((respuesta) => {
          if (respuesta !== null || respuesta !== undefined) {
            this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }

          this.router.navigate(['/departamentos']);
        });
    } else {
      this.departamentoService
        .actualizarDepartamento(this.departamento)
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

          this.router.navigate(['/departamentos']);
        });
    }
  }
}
