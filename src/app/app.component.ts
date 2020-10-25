import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { faWarehouse, faPlusSquare, faSignInAlt, faSearch, 
faArchive, faExchangeAlt, faHistory, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

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

  isUser = false;

  constructor(
    private cookieService: CookieService,
  ) { }
  ngOnInit(): void {
    const token = this.cookieService.get("token");
    if(token) this.isUser = true;
    else this.isUser = false;
  }

}
