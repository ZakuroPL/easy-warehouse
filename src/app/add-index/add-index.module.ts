import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIndexComponent } from './add-index.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'




const routes: Routes = [
  {path: 'add-index', component: AddIndexComponent}
];

@NgModule({
  declarations: [AddIndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class AddIndexModule { }


