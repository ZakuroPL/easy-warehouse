import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AddIndexComponent } from './add-index/add-index.component';
import { SupplyComponent } from './supply/supply.component';
import { SearchComponent } from './search/search.component';
import { CheckComponent } from './check/check.component';
import { TransferComponent } from './transfer/transfer.component';
import { HistoryComponent } from './history/history.component';
import { PackingComponent } from './packing/packing.component';
import { AuthComponent } from './auth/auth.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthGuard } from './auth.guard';




const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
  {path: 'add-index', component: AddIndexComponent, canActivate:[AuthGuard]},
  {path: 'supply', component: SupplyComponent, canActivate:[AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
  {path: 'check', component: CheckComponent, canActivate:[AuthGuard]},
  {path: 'transfer', component: TransferComponent, canActivate:[AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate:[AuthGuard]},
  {path: 'packing', component: PackingComponent, canActivate:[AuthGuard]},
  {path: 'auth', component: AuthComponent},
  {path: 'user', component: AddUserComponent, canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    AddIndexComponent,
    SupplyComponent,
    SearchComponent,
    CheckComponent,
    TransferComponent,
    HistoryComponent,
    PackingComponent,
    AuthComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
