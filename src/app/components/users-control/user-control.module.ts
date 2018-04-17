import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersControlComponent } from './users-control.component';
import { AddUserComponent } from './add-user/add-user.component';
// import { MyOwnCustomMaterialModule } from '../../common/ang-material.module';


const routes: Routes = [
    {
      path: '',
      component: AddUserComponent
    }
  ];


@NgModule({
    entryComponents: [
        AddUserComponent
    ],
    imports: [
        // MyOwnCustomMaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
      ],
    providers: [],
    declarations: [AddUserComponent],
    exports: [RouterModule],
    bootstrap: []
})

export class UserControlModule { }