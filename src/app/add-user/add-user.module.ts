import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: 'add-user', component: AddUserComponent}
];

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AddUserModule { }
