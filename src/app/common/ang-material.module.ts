import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule } from '@angular/material';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule],
})
export class MyOwnCustomMaterialModule { }