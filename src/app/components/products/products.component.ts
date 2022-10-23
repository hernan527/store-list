import { Component, OnInit } from '@angular/core';
import { Product, createProductDTO, UpdateProductDTO } from '../../models/product.model';
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
    category: {
      id:'',
      name:'',
    },
    description: ''
};

limit = 10;
offset = 0;
statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init' ;

  constructor(
    private storeService : StoreService,
    private apiService : ApiService,
    private cartService : CartService
  ) { 
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.apiService.getProductsByPage(10 , 0)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit
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
    this.statusDetail = 'loading';
    this.toggleProductDetail();
     this.apiService.getProduct(id)
     .subscribe(data => {
      console.log('product', data);
      
      this.productChosen = data;
      this.statusDetail = 'success';
     },errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
     })
  }
  createNewProduct(){
    const product: createProductDTO = {
    title: 'Nuevo Producto',
    description: 'bla bla bla',
    images: ['https://placeimg.com/640/480/any'],
    price: 1000,
    categoryId: 2,
  }
    this.apiService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
    }
    const id = this.productChosen.id;
    this.apiService.update(id,changes)
    .subscribe( data =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.apiService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMOre() {
    this.apiService.getProductsByPage(this.limit , this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
