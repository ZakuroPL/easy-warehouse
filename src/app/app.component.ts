import { Component, OnInit, HostListener } from '@angular/core';
import { faWarehouse, faPlusSquare, faSignInAlt, faSearch, 
faArchive, faExchangeAlt, faHistory, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthGuard } from './auth.guard';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  faWarehouse = faWarehouse;
  plusSquare = faPlusSquare;
  faIn = faSignInAlt;
  faSearch = faSearch;
  faArchive = faArchive;
  faExchangeAlt = faExchangeAlt;
  faHistory = faHistory;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

  plusPlus:number;

  constructor(
    public guard: AuthGuard,
    private apiService: ApiService,
  ) { }
  ngOnInit(): void {
    this.guard.canActivate();
    this.checkWidth();
  }
  @HostListener('window:resize')
  function() {
    this.checkWidth();
  }
  checkWidth(){
    window.innerWidth > 500 ? this.plusPlus = 10 : this.plusPlus = 3;
    this.apiService.plusPlusMessage(this.plusPlus);
  }

}
