import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {FormsModule} from '@angular/forms';
import {LazyLoadImageModule,  ScrollHooks } from 'ng-lazyload-image';
import { MatIconModule } from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

const materialModules = [
  MatIconModule,
      MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCardModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  LazyLoadImageModule.forRoot(ScrollHooks)
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules,
    AutocompleteLibModule,
    FormsModule
  ],
  exports: [

    FormsModule,
    AutocompleteLibModule,
    materialModules,
  ],
})
export class MaterialModule { }
