import { Component, OnInit, OnDestroy } from '@angular/core';
import { faWarehouse, faPlusSquare, faSignInAlt, faSearch, 
faArchive, faExchangeAlt, faHistory, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthGuard } from './auth.guard';

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

  constructor(
    public guard: AuthGuard
  ) { }
  ngOnInit(): void {
    this.guard.canActivate();
  }
  ngOnDestroy(): void {
    localStorage.removeItem("token");
  }

}
