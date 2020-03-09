import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule ],
  exports: [ MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule ],
})
export class MyOwnCustomMaterialModule {
}
