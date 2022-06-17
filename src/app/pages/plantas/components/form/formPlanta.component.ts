import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Planta } from '../../models/Planta';
import { PlantaService } from '../../services/planta.service';
import { DepartamentoService } from 'src/app/pages/departamento/services/departamento.service';
import { Departamento } from 'src/app/pages/departamento/models/Departamento';

@Component({
  selector: 'app-form',
  templateUrl: './formPlanta.component.html',
  styleUrls: ['./formPlanta.component.css'],
})
export class FormPlantaComponent implements OnInit {
  form!: FormGroup;
  planta: Planta = {
    planta_nombre: '',
    planta_procesamiento: '',
    planta_departamento_id: 0,
  };

  departamentos: Departamento[] = [];

  departamentosControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private plantaService: PlantaService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private departamentoService: DepartamentoService
  ) {}

  private inicializarFormulario(): void {
    this.departamentoService
      .obtenerTodosLosDepartamentos()
      .subscribe((data) => {
        this.departamentos = data;
      });

    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.plantaService.obtenerUnaPlanta(id).subscribe((respuesta) => {
          this.planta = respuesta;
          this.form = this.formBuilder.group({
            planta_nombre: [this.planta.planta_nombre, Validators.required],
            planta_procesamiento: [
              this.planta.planta_procesamiento,
              Validators.required,
            ],
            planta_departamento_id: [
              this.planta.planta_departamento_id,
              Validators.required,
            ],
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      planta_nombre: [this.planta.planta_nombre, Validators.required],
      planta_procesamiento: [
        this.planta.planta_procesamiento,
        Validators.required,
      ],
      planta_departamento_id: [
        this.planta.planta_departamento_id,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarTipoVehiculo() {
    this.planta.planta_nombre = this.form.value.planta_nombre;
    this.planta.planta_procesamiento = this.form.value.planta_procesamiento;
    this.planta.planta_departamento_id = this.form.value.planta_departamento_id;

    if (this.planta.planta_id === undefined) {
      if (this.planta.planta_departamento_id !== 0) {
        this.plantaService.crearPlanta(this.planta).subscribe((respuesta) => {
          if (respuesta !== null || respuesta !== undefined) {
            this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }

          this.router.navigate(['/plantas']);
        });
      } else {
        this._snackBar.open('Debe seleccionar un Departamento', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    } else {
      this.plantaService
        .actualizarPlanta(this.planta)
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

          this.router.navigate(['/plantas']);
        });
    }
  }
}
