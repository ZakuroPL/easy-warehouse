import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'



const routes: Routes = [
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class HistoryModule { }
