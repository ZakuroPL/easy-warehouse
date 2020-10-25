import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

  products: any = [];
  selectedProductByIndex = "";
  selectedProductByName = "";
  selectedProductByEan = "";
  selectedId = "";
  pcs: number;

  locationFrom = 1;

  nameOfSelected = "";

  isMoreThanOne = false;
  isAllEmpty = false;
  isPcsEmpty = false;
  isReadyForSupply = false;
  isCreated = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  getProductFromList(){
    this.selectedId = "";
    for (let product of this.products){
      if(this.selectedProductByIndex == product.index && this.selectedProductByName == "" && this.selectedProductByEan ==""){
        this.nameOfSelected = product.name;
        this.selectedId = product.id;
      } 
      else if(this.selectedProductByName == product.name && this.selectedProductByIndex == "" && this.selectedProductByEan ==""){
        this.nameOfSelected = product.name;
        this.selectedId = product.id;
      } 
      else if(this.selectedProductByEan == product.ean && this.selectedProductByName == "" && this.selectedProductByIndex ==""){
        this.nameOfSelected = product.name;
        this.selectedId = product.id;
      } 
      else console.log("product not found")
    }
    this.checkThis();
  }
  checkThis(){
    if(this.selectedProductByName != "" && this.selectedProductByEan !="" ||
    this.selectedProductByName != "" && this.selectedProductByIndex !="" ||
    this.selectedProductByEan != "" && this.selectedProductByIndex !="") this.isMoreThanOne = true;
    if(this.selectedProductByName == "" && this.selectedProductByEan =="" && this.selectedProductByIndex == "") this.isAllEmpty = true;
    this.supplyProduct();
  }

  supplyProduct(){
      if(!this.isMoreThanOne && !this.isAllEmpty && this.pcs != null && this.pcs > 0){
       this.isReadyForSupply = true;
      }
      else if(this.pcs == null || this.pcs <= 0) {
        if(this.isMoreThanOne==false && this.isAllEmpty==false){
          this.isPcsEmpty = true;
        }
      }
      else console.log("error");
    };
  confirmSupplyProduct(){
    console.log("id: " + this.selectedId + "pcs: " + this.pcs);
    this.sendToApi();
    this.ok();
  }
  ok(){
    this.isMoreThanOne = false;
    this.isAllEmpty = false;
    this.isPcsEmpty = false;
    this.isReadyForSupply = false;
    this.isCreated = false;
    this.selectedProductByIndex = "";
    this.selectedProductByName = "";
    this.selectedProductByEan = "";
    this. selectedId = "";
    this.pcs = null;
  }
  sendToApi(){
    const token = this.cookieService.get("token");
    if(!token){
      this.router.navigate(['/auth']);
    }
    this.apiService.postSupplyProduct(this.locationFrom, this.selectedId, this.pcs).subscribe(
      result => {
        console.log(result);
        this.isCreated = true;
      },
      error => {
        console.log(error);
      }
    )
  }
    

  ngOnInit(): void {
    const token = this.cookieService.get("token");
    if(!token){
      this.router.navigate(['/auth']);
    }
    this.apiService.getProductList().subscribe(
      data => {
        this.products = data;
        this.products.sort((a,b) =>{
          return a.index-b.index;
        });
      },
      error => {
        console.log(error)
        this.router.navigate(['/auth']);
      }
    );
  }//ngOnInit

}
