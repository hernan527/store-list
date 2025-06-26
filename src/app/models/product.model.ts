export interface Category {
    id: string;
    name: string;
  }
  
  export interface Product {
    asin: string;
    product_title: string;
    product_price: number; // En formato de string para representar monedas como '$270.83'
    product_original_price: number; // En formato de string para representar monedas como '$299.99'
    currency: string; // USD o cualquier otra moneda
    product_star_rating: number;
    product_num_ratings: number;
    product_url: string; // URL completa del producto
    product_photo: string; // URL de la imagen del producto
    product_num_offers: number;
    product_minimum_offer_price: string; // En formato de string para representar monedas como '$270.83'
    is_best_seller: boolean;
    is_amazon_choice: boolean;
    is_prime: boolean;
    climate_pledge_friendly: boolean;
    sales_volume: string; // Puede ser algo como "1K+ bought in past month"
    delivery: string; // Detalles sobre el envío
  }
  
  export interface createProductDTO extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
  }
  
  export interface UpdateProductDTO extends Partial<createProductDTO> { }
  