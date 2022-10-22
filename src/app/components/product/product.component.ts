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
  
    @Output() addedProduct = new EventEmitter<Product>();
    @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product)
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id)
  }
}
