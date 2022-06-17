import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentoModule } from './pages/departamento/departamento.module';
import { HomeModule } from './pages/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TiposVehiculosModule } from './pages/tipos_vehiculos/tiposVehiculos.module';
import { ClienteModule } from './pages/clientes/cliente.module';
import { BodegaModule } from './pages/bodegas/bodega.module';
import { PlantaModule } from './pages/plantas/planta.module';
import { VehiculoModule } from './pages/vehiculos/vehiculo.module';
import { CategoriaProductoModule } from './pages/categorias_productos/categoriaProducto.module';
import { ProductoModule } from './pages/productos/producto.module';
import { SolicitudesModule } from './pages/solicitudes_vehiculos/solicitudes.module';
import { ServicioModule } from './pages/servicios/servicio.module';


import localeGt from '@angular/common/locales/es-GT';
registerLocaleData(localeGt, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DepartamentoModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TiposVehiculosModule,
    ClienteModule,
    BodegaModule,
    PlantaModule,
    VehiculoModule,
    CategoriaProductoModule,
    ProductoModule,
    SolicitudesModule,
    ServicioModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
