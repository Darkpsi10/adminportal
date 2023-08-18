import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  exports: [
    MatDatepickerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatMenuModule,
    MatTreeModule,
    MatRadioModule,
  ],
  imports: [],
})
export class MaterialModule {}
