import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './components/grid/producto.component';
import { FormProductoComponent } from './components/form/formProducto.component';


@NgModule({
  declarations: [ProductoComponent, FormProductoComponent],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRadioModule,
    CommonModule
  ],
  providers: []
})
export class ProductoModule {}
