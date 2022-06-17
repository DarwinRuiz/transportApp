import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from '../../models/Vehiculo';
import { TiposVehiculosService } from 'src/app/pages/tipos_vehiculos/services/tiposVehiculos.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { PlantaService } from 'src/app/pages/plantas/services/planta.service';
import { TiposVehiculos } from 'src/app/pages/tipos_vehiculos/models/TiposVehiculos';
import { Planta } from 'src/app/pages/plantas/models/Planta';

@Component({
  selector: 'app-form',
  templateUrl: './formVehiculo.component.html',
  styleUrls: ['./formVehiculo.component.css'],
})
export class FormVehiculoComponent implements OnInit {
  form!: FormGroup;
  vehiculo: Vehiculo = {
    vehiculo_placa: '',
    vehiculo_modelo: '',
    vehiculo_linea: 0,
    vehiculo_disponible: false,
    vehiculo_tiposvehi_id: 0,
    vehiculo_planta_id: 0,
  };

  tiposVehiculos: TiposVehiculos[] = [];

  plantas: Planta[] = [];

  departamentosControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private tiposVehiculoService: TiposVehiculosService,
    private plantaService: PlantaService
  ) {}

  private inicializarFormulario(): void {
    this.tiposVehiculoService
      .obtenerTodosLosTiposVehiculos()
      .subscribe((data) => {
        this.tiposVehiculos = data;
      });

    this.plantaService.obtenerTodasLasPlantas().subscribe((data) => {
      this.plantas = data;
    });

    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.vehiculoService.obtenerUnVehiculo(id).subscribe((respuesta) => {
          this.vehiculo = respuesta;
          this.form = this.formBuilder.group({
            vehiculo_placa: [this.vehiculo.vehiculo_placa, Validators.required],
            vehiculo_modelo: [
              this.vehiculo.vehiculo_modelo,
              Validators.required,
            ],
            vehiculo_linea: [this.vehiculo.vehiculo_linea, Validators.required],
            vehiculo_disponible: [
              this.vehiculo.vehiculo_disponible,
              Validators.required,
            ],
            vehiculo_tiposvehi_id: [
              this.vehiculo.vehiculo_tiposvehi_id,
              Validators.required,
            ],
            vehiculo_planta_id: [
              this.vehiculo.vehiculo_planta_id,
              Validators.required,
            ],
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      vehiculo_placa: [this.vehiculo.vehiculo_placa, Validators.required],
      vehiculo_modelo: [this.vehiculo.vehiculo_modelo, Validators.required],
      vehiculo_linea: [this.vehiculo.vehiculo_linea, Validators.required],
      vehiculo_disponible: [
        this.vehiculo.vehiculo_disponible,
        Validators.required,
      ],
      vehiculo_tiposvehi_id: [
        this.vehiculo.vehiculo_tiposvehi_id,
        Validators.required,
      ],
      vehiculo_planta_id: [
        this.vehiculo.vehiculo_planta_id,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarVehiculo() {
    this.vehiculo.vehiculo_placa = this.form.value.vehiculo_placa.toUpperCase();
    this.vehiculo.vehiculo_modelo = this.form.value.vehiculo_modelo;
    this.vehiculo.vehiculo_linea = this.form.value.vehiculo_linea;
    this.vehiculo.vehiculo_disponible = this.form.value.vehiculo_disponible;
    this.vehiculo.vehiculo_tiposvehi_id = this.form.value.vehiculo_tiposvehi_id;
    this.vehiculo.vehiculo_planta_id = this.form.value.vehiculo_planta_id;

    if (this.vehiculo.vehiculo_id === undefined) {
      if (this.vehiculo.vehiculo_planta_id !== 0 || this.vehiculo.vehiculo_tiposvehi_id !== 0) {
        this.vehiculoService
          .crearVehiculo(this.vehiculo)
          .subscribe((respuesta) => {
            if (respuesta !== null || respuesta !== undefined) {
              this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }

            this.router.navigate(['/vehiculos']);
          });
      } else {
        this._snackBar.open('Debe seleccionar todos los elementos del formulario', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    } else {
      this.vehiculoService
        .actualizarVehiculo(this.vehiculo)
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

          this.router.navigate(['/vehiculos']);
        });
    }
  }
}
