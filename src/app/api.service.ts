import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { History } from './models/history';
import { Transfer } from './models/transfer';
import { Product } from './models/product';
import { Location } from './models/location';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private plusPlus = new BehaviorSubject<number>(0);
  plusPlus$ = this.plusPlus.asObservable();

  // apiURL = "http://127.0.0.1:8000/api/"
  // authURL = "http://127.0.0.1:8000/auth/"

  apiURL = "https://zakuro-warehouse.herokuapp.com/api/"
  authURL = "https://zakuro-warehouse.herokuapp.com/auth/"

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
  ) { }

  plusPlusMessage(plusPlus:number){
    this.plusPlus.next(plusPlus);
  }

  getTransfers() {
    return  this.httpClient.get<Transfer[]>(`${this.apiURL}transfers/`, {headers: this.getToken()});
  }
  getLocationList() {
    return this.httpClient.get<Location[]>(`${this.apiURL}locations/`, {headers: this.getToken()})
  }
  getProductList() {
    return this.httpClient.get<Product[]>(`${this.apiURL}products/`, {headers: this.getToken()})
  }
  getHistory(){
    return this.httpClient.get<History[]>(`${this.apiURL}history/`, {headers: this.getToken()})
  }
  postNewProduct(index: number, name: string, ean: number) {
    const newProduct = JSON.stringify({index, name, ean});
    return this.httpClient.post(`${this.apiURL}products/`, newProduct, {headers: this.getToken()})
  }
  postSupplyProduct(locationFrom: number, product: number, pcs: number){
    const json = JSON.stringify({product, pcs, locationFrom});
    return this.httpClient.post(`${this.apiURL}locations/1/add_transfer/`, json, {headers: this.getToken()})
  }
  postTransferProduct(locationFrom, product, pcs, location){
    const json = JSON.stringify({product, pcs, locationFrom, location});
    return this.httpClient.post(`${this.apiURL}locations/${location}/add_transfer/`, json, {headers: this.getToken()})
  }
  postPackingProduct(locationFrom: number, product: string, pcs: number){
    const json = JSON.stringify({product, pcs, locationFrom});
    return this.httpClient.post(`${this.apiURL}locations/2/add_transfer/`, json, {headers: this.getToken()})
  }
  loginUser(loginData){
    const json = JSON.stringify(loginData);
    return this.httpClient.post(this.authURL, json, {headers: this.getToken()})
  }
  createUser(newUserData){
    const json = JSON.stringify(newUserData);
    return this.httpClient.post(`${this.apiURL}users/`, json, {headers: this.getToken()})
  }

  getToken(){
    const token = sessionStorage.getItem("token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    })
  }


}
