import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyComponent } from './supply.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'




const routes: Routes = [
  {path: 'supply', component: SupplyComponent}
];


@NgModule({
  declarations: [SupplyComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class SupplyModule { }
