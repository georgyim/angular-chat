import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule],
})
export class MyOwnCustomMaterialModule { }