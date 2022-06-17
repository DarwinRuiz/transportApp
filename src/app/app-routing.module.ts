import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBodegaComponent } from './pages/bodegas/components/form/formBodega.component';
import { BodegaComponent } from './pages/bodegas/components/grid/bodega.component';
import { FormCategoriaProductoComponent } from './pages/categorias_productos/components/form/formCategoriaProducto.component';
import { CategoriaProductoComponent } from './pages/categorias_productos/components/grid/categoriaProducto.component';
import { FormClienteComponent } from './pages/clientes/components/form/formCliente.component';
import { ClienteComponent } from './pages/clientes/components/grid/cliente.component';
import { FormDepartamentoComponent } from './pages/departamento/components/form/formDepartamento.component';
import { DepartamentoComponent } from './pages/departamento/components/grid/departamento.component';
import { HomeComponent } from './pages/home/components/home.component';
import { FormPlantaComponent } from './pages/plantas/components/form/formPlanta.component';
import { PlantaComponent } from './pages/plantas/components/grid/planta.component';
import { FormProductoComponent } from './pages/productos/components/form/formProducto.component';
import { ProductoComponent } from './pages/productos/components/grid/producto.component';
import { FormServicioComponent } from './pages/servicios/components/form/formServicio.component';
import { ServicioComponent } from './pages/servicios/components/servicio/servicio.component';
import { FormSolicitudComponent } from './pages/solicitudes_vehiculos/components/form/formSolicitud.component';
import { SolicitudComponent } from './pages/solicitudes_vehiculos/components/solicitud/solicitud.component';
import { FormTiposVehiculosComponent } from './pages/tipos_vehiculos/components/form/formTiposVehiculos.component';
import { TiposVehiculosComponent } from './pages/tipos_vehiculos/components/grid/tiposVehiculos.component';
import { FormVehiculoComponent } from './pages/vehiculos/components/form/formVehiculo.component';
import { VehiculoComponent } from './pages/vehiculos/components/grid/vehiculo.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "departamentos",
    component: DepartamentoComponent
  },
  {
    path: "form-departamento",
    component: FormDepartamentoComponent
  },
  {
    path: "form-departamento/:id",
    component: FormDepartamentoComponent
  },
  {
    path: "tipos-vehiculos",
    component: TiposVehiculosComponent
  },
  {
    path: "form-tipos-vehiculos",
    component: FormTiposVehiculosComponent
  },
  {
    path: "form-tipos-vehiculos/:id",
    component: FormTiposVehiculosComponent
  },
  {
    path: "clientes",
    component: ClienteComponent
  },
  {
    path: "form-clientes",
    component: FormClienteComponent
  },
  {
    path: "form-clientes/:id",
    component: FormClienteComponent
  },
  {
    path: "bodegas",
    component: BodegaComponent
  },
  {
    path: "form-bodegas",
    component: FormBodegaComponent
  },
  {
    path: "form-bodegas/:id",
    component: FormBodegaComponent
  },
  {
    path: "plantas",
    component: PlantaComponent
  },
  {
    path: "form-plantas",
    component: FormPlantaComponent
  },
  {
    path: "form-plantas/:id",
    component: FormPlantaComponent
  },
  {
    path: "vehiculos",
    component: VehiculoComponent
  },
  {
    path: "form-vehiculos",
    component: FormVehiculoComponent
  },
  {
    path: "form-vehiculos/:id",
    component: FormVehiculoComponent
  },
  {
    path: "categorias-productos",
    component: CategoriaProductoComponent
  },
  {
    path: "form-categorias-productos",
    component: FormCategoriaProductoComponent
  },
  {
    path: "form-categorias-productos/:id",
    component: FormCategoriaProductoComponent
  },
  {
    path: "productos",
    component: ProductoComponent
  },
  {
    path: "form-productos",
    component: FormProductoComponent
  },
  {
    path: "form-productos/:id",
    component: FormProductoComponent
  },
  {
    path: "solicitudes-transporte",
    component: SolicitudComponent
  },
  {
    path: "form-solicitudes-transporte",
    component: FormSolicitudComponent
  },
  {
    path: "form-solicitudes-transporte/:id",
    component: FormSolicitudComponent
  },
  {
    path: "servicios",
    component: ServicioComponent
  },
  {
    path: "form-servicios",
    component: FormServicioComponent
  },
  {
    path: "form-servicios/:id",
    component: FormServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
