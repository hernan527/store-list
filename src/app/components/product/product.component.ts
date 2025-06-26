import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { } from '../../directives/highlight.directive';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{

  @Input() product: Product={
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
    delivery: ''
    };
  
    @Output() addedProduct = new EventEmitter<Product>();
    @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  onShowDetail() {
    this.showProduct.emit(this.product.asin)
  }
}
