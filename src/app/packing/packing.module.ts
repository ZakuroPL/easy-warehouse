import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingComponent } from './packing.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'



const routes: Routes = [
  {path: 'packing', component: PackingComponent}
];


@NgModule({
  declarations: [PackingComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PackingModule { }
