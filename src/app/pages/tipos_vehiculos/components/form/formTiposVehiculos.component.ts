import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposVehiculosService } from '../../services/tiposVehiculos.service';
import { TiposVehiculos } from '../../models/TiposVehiculos';

@Component({
  selector: 'app-form',
  templateUrl: './formTiposVehiculos.component.html',
  styleUrls: ['./formTiposVehiculos.component.css'],
})
export class FormTiposVehiculosComponent implements OnInit {
  form!: FormGroup;
  tipoVehiculo: TiposVehiculos = {
    tiposVehi_nombre: '',
    tiposVehi_capacidad: '',
    tiposVehi_medida: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tiposVehiculosService: TiposVehiculosService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute
  ) {}

  private inicializarFormulario(): void {
    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.tiposVehiculosService
          .obtenerUnTiposVehiculos(id)
          .subscribe((respuesta) => {
            this.tipoVehiculo = respuesta;
            this.form = this.formBuilder.group({
              tiposVehi_nombre: [
                this.tipoVehiculo.tiposVehi_nombre,
                Validators.required,
              ],
              tiposVehi_capacidad: [
                this.tipoVehiculo.tiposVehi_capacidad,
                Validators.required,
              ],
              tiposVehi_medida: [
                this.tipoVehiculo.tiposVehi_medida,
                Validators.required,
              ],
            });
          });
      }
    });

    this.form = this.formBuilder.group({
      tiposVehi_nombre: [
        this.tipoVehiculo.tiposVehi_nombre,
        Validators.required,
      ],
      tiposVehi_capacidad: [
        this.tipoVehiculo.tiposVehi_capacidad,
        Validators.required,
      ],
      tiposVehi_medida: [
        this.tipoVehiculo.tiposVehi_medida,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarTipoVehiculo() {
    this.tipoVehiculo.tiposVehi_nombre =
      this.form.value.tiposVehi_nombre.toUpperCase();
    this.tipoVehiculo.tiposVehi_capacidad = this.form.value.tiposVehi_capacidad;
    this.tipoVehiculo.tiposVehi_medida = this.form.value.tiposVehi_medida;

    if (this.tipoVehiculo.tiposVehi_id === undefined) {
      this.tiposVehiculosService
        .crearTiposVehiculos(this.tipoVehiculo)
        .subscribe((respuesta) => {
          if (respuesta !== null || respuesta !== undefined) {
            this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }

          this.router.navigate(['/tipos-vehiculos']);
        });
    } else {
      this.tiposVehiculosService
        .actualizarTiposVehiculos(this.tipoVehiculo)
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

          this.router.navigate(['/tipos-vehiculos']);
        });
    }
  }
}
