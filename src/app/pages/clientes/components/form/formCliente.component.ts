import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './formCliente.component.html',
  styleUrls: ['./formCliente.component.css'],
})
export class FormClienteComponent implements OnInit {
  form!: FormGroup;
  cliente: Cliente = {
    cliente_nombre: '',
    cliente_pais: '',
    cliente_representante_legal: '',
    cliente_telefono: '',
    cliente_nit: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientesService: ClienteService,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute
  ) {}

  private inicializarFormulario(): void {
    this.activatedRouter.params.subscribe((parametro) => {
      const id = parametro['id'];
      if (id !== undefined && id !== null) {
        this.clientesService.obtenerUnCliente(id).subscribe((respuesta) => {
          this.cliente = respuesta;
          this.form = this.formBuilder.group({
            cliente_nombre: [this.cliente.cliente_nombre, Validators.required],
            cliente_pais: [this.cliente.cliente_pais, Validators.required],
            cliente_representante_legal: [
              this.cliente.cliente_representante_legal,
              Validators.required,
            ],
            cliente_telefono: [
              this.cliente.cliente_telefono,
              Validators.required,
            ],
            cliente_nit: [this.cliente.cliente_nit, Validators.required],
          });
        });
      }
    });

    this.form = this.formBuilder.group({
      cliente_nombre: [this.cliente.cliente_nombre, Validators.required],
      cliente_pais: [this.cliente.cliente_pais, Validators.required],
      cliente_representante_legal: [
        this.cliente.cliente_representante_legal,
        Validators.required,
      ],
      cliente_telefono: [this.cliente.cliente_telefono, Validators.required],
      cliente_nit: [this.cliente.cliente_nit, Validators.required],
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  agregarCliente() {
    this.cliente.cliente_nombre = this.form.value.cliente_nombre;
    this.cliente.cliente_pais = this.form.value.cliente_pais.toUpperCase();
    this.cliente.cliente_representante_legal = this.form.value.cliente_representante_legal;
    this.cliente.cliente_telefono = this.form.value.cliente_telefono;
    this.cliente.cliente_nit = this.form.value.cliente_nit;

    if (this.cliente.cliente_id === undefined) {
      this.clientesService
        .crearCliente(this.cliente)
        .subscribe((respuesta) => {
          if (respuesta !== null || respuesta !== undefined) {
            this._snackBar.open('El Registro ha sido Creado con éxito!', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }

          this.router.navigate(['/clientes']);
        });
    } else {
      this.clientesService
        .actualizarCliente(this.cliente)
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

          this.router.navigate(['/clientes']);
        });
    }
  }
}
