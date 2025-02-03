import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProductList } from '../../store/product/product.selector';
import * as ProductAction from '../../store/product/product.action';
import { Product } from '../Admin/models/product';

@Component({
  selector: 'app-products',
	standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedCategory: string = 'All';
  sortBy: string = 'featured';
  searchQuery: string = '';
  products$: Observable<Product[]>;

  categories: string[] = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Sports',
    'Books',
    'Beauty'
  ];

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.products$ = this.store.select(selectProductList);
  }

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      if(!products || products.length === 0) {
        console.log('get products in ProductsComponent!');
        this.store.dispatch(ProductAction.getProductList());
      }
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    // Implement category filtering logic
  }


  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    // Implement search logic
  }

		gotoProductDetail(product: Product): void {
			this.router.navigate(['/auth/productdetail', product.id]);
		}
} 