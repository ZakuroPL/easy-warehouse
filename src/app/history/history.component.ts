import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  products: any = [];
  history: any = [];
  selectedProduct = "";

  selectedProductByIndex = "";
  selectedProductByName = "";
  selectedProductByEan = "";

  isMoreThanOne = false;
  isAllEmpty = false;
  isNotFound = false;
  isConnected= true;

  numberForCheck = 0;


  getProductFromList(){
    this.isConnected = false;
    this.isNotFound = false;
    this.apiService.getHistory().subscribe(
      data => {
        this.history = data;
        this.history.sort((a,b) =>{
          var c: any = new Date(a.date_transfer);
          var d: any = new Date(b.date_transfer);
          return d-c;
        });
        this.selectedProduct = "";
        this.checkThis();
        for (let product of this.products){
          if(this.selectedProductByIndex == product.index && this.selectedProductByName == "" && this.selectedProductByEan =="") this.selectedProduct = product.name
          else if(this.selectedProductByName == product.name && this.selectedProductByIndex == "" && this.selectedProductByEan =="") this.selectedProduct = product.name
          else if(this.selectedProductByEan == product.ean && this.selectedProductByName == "" && this.selectedProductByIndex =="")  this.selectedProduct = product.name
          else console.log("product not found")
        }
        this.numberForCheck = 0;
        for (let histor of this.history){
          if(histor.product_name != this.selectedProduct) this.numberForCheck++
        }
        if(this.history.length == this.numberForCheck){
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
      error => {
        console.log(error)
        this.router.navigate(['/auth']);
      }
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
      error => console.log(error)
    );
  }//ngOnInit

}