import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddIndexModule } from './add-index/add-index.module';
import { AddUserModule } from './add-user/add-user.module';
import { AuthModule } from './auth/auth.module';
import { CheckModule } from './check/check.module';
import { HistoryModule } from './history/history.module';
import { PackingModule } from './packing/packing.module';
import { SearchModule } from './search/search.module';
import { SupplyModule } from './supply/supply.module';
import { TransferModule } from './transfer/transfer.module';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AuthModule,
    AddIndexModule,
    AddUserModule,
    CheckModule,
    HistoryModule,
    PackingModule,
    SearchModule,
    SupplyModule,
    TransferModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
