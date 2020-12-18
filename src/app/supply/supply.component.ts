import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

  products: any = [];
  selectedProductByIndex: string = "";
  selectedProductByName: string = "";
  selectedProductByEan: string = "";
  selectedId: string;
  pcs: number;
  pcsForConfirm: number;

  locationFrom: number = 1;

  nameOfSelected: string;

  isMoreThanOne:boolean = false;
  isAllEmpty:boolean = false;
  isPcsEmpty:boolean = false;
  isReadyForSupply:boolean = false;
  isCreated:boolean = false;

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
      error => {
        console.log(error)
      }
    );
  }

  beforeSupply(){
    if(this.selectedProductByName != "" && this.selectedProductByEan !="" ||
    this.selectedProductByName != "" && this.selectedProductByIndex !="" ||
    this.selectedProductByEan != "" && this.selectedProductByIndex !="") this.isMoreThanOne = true;
    else if(this.selectedProductByName == "" && this.selectedProductByEan =="" && this.selectedProductByIndex == "") this.isAllEmpty = true;
    else if(this.pcs <= 0 || this.pcs == null) this.isPcsEmpty = true;
    else{
      for (let product of this.products){
        if(this.selectedProductByIndex == product.index && !this.isMoreThanOne ||
        this.selectedProductByName == product.name && !this.isMoreThanOne ||
        this.selectedProductByEan == product.ean && !this.isMoreThanOne){
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
    )}
}
