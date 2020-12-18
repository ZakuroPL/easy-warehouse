import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  products: any = [];
  history: any = [];
  selectedProduct:string;

  selectedProductByIndex:string = "";
  selectedProductByName:string = "";
  selectedProductByEan:string = "";

  isMoreThanOne:boolean = false;
  isAllEmpty:boolean = false;
  isNotFound:boolean = false;
  isConnected:boolean = true;

  numberForCheck:number = 0;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getProductList().subscribe(
      data => {
        this.products = data;
        this.products.sort((a,b) =>{
          return a.index-b.index;
        });
      },
      error => console.log(error)
    );
  }

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
          if(!this.isMoreThanOne){
            if(this.selectedProductByIndex == product.index ||
              this.selectedProductByName == product.name 
              || this.selectedProductByEan == product.ean) this.selectedProduct = product.name;
          }
        }
        this.numberForCheck = 0;
        for (let histor of this.history){
          if(histor.product_name != this.selectedProduct) this.numberForCheck++
        }
        this.isNotFound = this.history.length == this.numberForCheck;

        this.selectedProductByIndex = "";
        this.selectedProductByName = "";
        this.selectedProductByEan = "";
        this.isConnected = true;
      },
      error => {
        console.log(error)
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
}