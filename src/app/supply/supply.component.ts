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
  pcsForConfirm: number;

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

  beforeSupply(){
    if(this.selectedProductByName != "" && this.selectedProductByEan !="" ||
    this.selectedProductByName != "" && this.selectedProductByIndex !="" ||
    this.selectedProductByEan != "" && this.selectedProductByIndex !="") this.isMoreThanOne = true;
    else if(this.selectedProductByName == "" && this.selectedProductByEan =="" && this.selectedProductByIndex == "") this.isAllEmpty = true;
    else if(this.pcs <= 0 || this.pcs == null) this.isPcsEmpty = true;
    else{
      for (let product of this.products){
        if(this.selectedProductByIndex == product.index && this.selectedProductByName == "" && this.selectedProductByEan =="" ||
        this.selectedProductByName == product.name && this.selectedProductByIndex == "" && this.selectedProductByEan =="" ||
        this.selectedProductByEan == product.ean && this.selectedProductByName == "" && this.selectedProductByIndex ==""){
          this.nameOfSelected = product.name;
          this.selectedId = product.id;
          this.isReadyForSupply = true;
        }
      }
    }
  }
  confirmSupplyProduct(){
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
    this.pcsForConfirm = this.pcs;
    this.pcs = null;
  }
  sendToApi(){
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
