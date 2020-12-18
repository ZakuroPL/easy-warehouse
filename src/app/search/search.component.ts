import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  products: any = [];
  transfers: any = [];

  selectedProduct:string;
  myProduct:string;

  numberForCheck = 0;

  selectedProductByIndex:string = "";
  selectedProductByName:string = "";
  selectedProductByEan:string = "";

  isMoreThanOne:boolean = false;
  isAllEmpty:boolean = false;
  isNotFound:boolean = false;
  isConnected:boolean = true;
  
  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProductList().subscribe(
      data => {
        this.products = data;
        this.products.sort((a,b) =>{
          return a.index-b.index;
        });
      },
      error => {
        console.log(error);
      }
    );
  }

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
        this.isNotFound = this.transfers.length == this.numberForCheck;

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
}
