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
  asin: '',
  product_title: '',
  product_photo: '',
  product_price: 1000,
  product_original_price: 0,
  currency: '',
  product_star_rating: 0,
  product_num_ratings: 0,
  product_url: '',
  product_num_offers: 0,
  product_minimum_offer_price: '',
  is_best_seller: false,
  is_amazon_choice: false,
  is_prime: false,
  climate_pledge_friendly: false,
  sales_volume: '',
  delivery: '',

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
    // this.apiService.getProductsByPage(10 , 0)
    // .subscribe(data => {
    //   this.products = data;
    //   this.offset += this.limit
    // });

    this.apiService.getProductsByCategory('2478868012', '1', 'US', 'RELEVANCE', 'ALL', 105, 110, '')
    .subscribe(response => {
      if (response && response.data && response.data.products && response.data.products.length > 0) {
        console.log('Productos obtenidos:', response.data.products);
        this.products = response.data.products;  // Aquí puedes adaptar la estructura de los datos según lo que te devuelva la API
        console.log(this.products);
      } else {
        console.log('No se encontraron productos.');
      }
    },
    (error) => {
      console.error('Error al obtener los products:', error);
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
      asin: '',
      product_title: 'Nuevo Producto',
      product_photo: 'https://placeimg.com/640/480/any',
      product_price: 1000,
      categoryId: 2,
      product_original_price: 0,
      currency: '',
      product_star_rating: 0,
      product_num_ratings: 0,
      product_url: '',
      product_num_offers: 0,
      product_minimum_offer_price: '',
      is_best_seller: false,
      is_amazon_choice: false,
      is_prime: false,
      climate_pledge_friendly: false,
      sales_volume: '',
      delivery: ''
    }
    this.apiService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      product_title: 'change title',
    }
    const id = this.productChosen.asin;
    this.apiService.update(id,changes)
    .subscribe( data =>{
      const productIndex = this.products.findIndex(item => item.asin === this.productChosen.asin);
      this.products[productIndex] = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.asin;
    this.apiService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.asin === this.productChosen.asin);
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
