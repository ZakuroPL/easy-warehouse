import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  createUserURL = "https://zakuro-warehouse.herokuapp.com/api/users/"
  loginUrl = "https://zakuro-warehouse.herokuapp.com/auth/"
  transferUrl = "https://zakuro-warehouse.herokuapp.com/api/transfers/"
  locationURL = "https://zakuro-warehouse.herokuapp.com/api/locations/"
  productURL = "https://zakuro-warehouse.herokuapp.com/api/products/"
  supplyURL =  "https://zakuro-warehouse.herokuapp.com/api/locations/1/add_transfer/"
  packingURL =  "https://zakuro-warehouse.herokuapp.com/api/locations/2/add_transfer/"
  historyURL = "https://zakuro-warehouse.herokuapp.com/api/history/"

  // createUserURL = "http://127.0.0.1:8000/api/users/"
  // loginUrl = "http://127.0.0.1:8000/auth/"
  // transferUrl = "http://127.0.0.1:8000/api/transfers/"
  // locationURL = "http://127.0.0.1:8000/api/locations/"
  // productURL = "http://127.0.0.1:8000/api/products/"
  // supplyURL =  "http://127.0.0.1:8000/api/locations/1/add_transfer/"
  // packingURL =  "http://127.0.0.1:8000/api/locations/2/add_transfer/"
  // historyURL = "http://127.0.0.1:8000/api/history/"

  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) { }
  
  getTransfers() {
    return  this.httpClient.get(this.transferUrl, {headers: this.getTokenFromCookie()});
  }
  getLocationList() {
    return this.httpClient.get(this.locationURL, {headers: this.getTokenFromCookie()})
  }
  getProductList() {
    return this.httpClient.get(this.productURL, {headers: this.getTokenFromCookie()})
  }
  getHistory(){
    return this.httpClient.get(this.historyURL, {headers: this.getTokenFromCookie()})
  }
  postNewProduct(index: number, name: string, ean: number) {
    const newProduct = JSON.stringify(
      {index, name, ean}
    );
    return this.httpClient.post(this.productURL, newProduct, {headers: this.getTokenFromCookie()})
  }
  postSupplyProduct(locationFrom: number, product: string, pcs: number){
    const newTransfer = JSON.stringify({product, pcs, locationFrom});
    return this.httpClient.post(this.supplyURL, newTransfer, {headers: this.getTokenFromCookie()})
  }
  postTransferProduct(locationFrom, product, pcs, location){
    const newTransfer = JSON.stringify({product, pcs, locationFrom, location});
    return this.httpClient.post(`${this.locationURL}${location}/add_transfer/`, newTransfer, {headers: this.getTokenFromCookie()})
  }
  postPackingProduct(locationFrom: number, product: string, pcs: number){
    const newTransfer = JSON.stringify({product, pcs, locationFrom});
    return this.httpClient.post(this.packingURL, newTransfer, {headers: this.getTokenFromCookie()})
  }
  loginUser(loginData){
    const newTransfer = JSON.stringify(loginData);
    return this.httpClient.post(this.loginUrl, newTransfer, {headers: this.getTokenFromCookie()})
  }
  createUser(newUserData){
    const newTransfer = JSON.stringify(newUserData);
    return this.httpClient.post(this.createUserURL, newTransfer, {headers: this.getTokenFromCookie()})
  }

  getTokenFromCookie(){
    const token = this.cookieService.get("token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    })
  }


}
