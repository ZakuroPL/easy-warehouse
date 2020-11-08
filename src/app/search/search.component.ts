import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  products: any = [];
  transfers: any = [];

  selectedProduct = "";
  myProduct = "";

  numberForCheck = 0;

  selectedProductByIndex = "";
  selectedProductByName = "";
  selectedProductByEan = "";

  isMoreThanOne = false;
  isAllEmpty = false;
  isNotFound = false;
  isConnected= true;

  getProductFromList(){
    this.isConnected = false;
    this.isNotFound = false;
    this.selectedProduct = "";
    this.apiService.getTransfers().subscribe(
      data => {
        this.transfers = data;
        this.transfers.sort((a,b) =>{
          return b.pcs-a.pcs;
        });
        this.checkThis();
        for (let product of this.products){
          if(this.selectedProductByIndex == product.index && this.selectedProductByName == "" && this.selectedProductByEan =="") this.selectedProduct = product.name
          else if(this.selectedProductByName == product.name && this.selectedProductByIndex == "" && this.selectedProductByEan =="") this.selectedProduct = product.name
          else if(this.selectedProductByEan == product.ean && this.selectedProductByName == "" && this.selectedProductByIndex =="")  this.selectedProduct = product.name
        }
        this.numberForCheck = 0;
        this.myProduct = this.selectedProduct;
        for (let transfer of this.transfers){
          if(transfer.product_name != this.myProduct || transfer.product_name == this.myProduct && transfer.pcs <= 0) this.numberForCheck++
        }
        if(this.transfers.length == this.numberForCheck){
          this.isNotFound = true;
        }
        else{
          this.isNotFound = false;
        }

        this.selectedProductByIndex = "";
        this.selectedProductByName = "";
        this.selectedProductByEan = "";
        this.isConnected = true;
      },
      error => console.log(error)
    );
    
  }
  checkThis(){
    if(this.selectedProductByName != "" && this.selectedProductByEan !="" ||
    this.selectedProductByName != "" && this.selectedProductByIndex !="" ||
    this.selectedProductByEan != "" && this.selectedProductByIndex !="") this.isMoreThanOne = true;
    if(this.selectedProductByName == "" && this.selectedProductByEan =="" && this.selectedProductByIndex == "") this.isAllEmpty = true;
  }
  ok(){
    this.isMoreThanOne = false;
    this.isAllEmpty = false;
  }



  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

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
