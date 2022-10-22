import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService }from '../../services/store.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

myShoppingCart: Product[] = [];
total = 0;
showProductDetail = false;
products: Product[] = [];
productChosen: Product ={
  id:'',
    title:'',
    images:[],
    price:0,
    description:'',
    category: {
      id:'',
      name:'',
    }
};
  constructor(
    private storeService : StoreService,
    private apiService : ApiService,
    private cartService : CartService
  ) { 
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.apiService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product){

    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string) {
     this.apiService.getProduct(id)
     .subscribe(data => {
      console.log('product', data);
      this.toggleProductDetail();
      this.productChosen = data;
     })

  }
  }

