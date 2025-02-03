import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectProductList } from '../../store/product/product.selector';
import * as ProductAction from '../../store/product/product.action';
import { Product } from '../Admin/models/product';
import { Category } from '../Admin/models/category';
import { CategoryService } from '../../service/category-service';

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
	private allProducts$: Observable<Product[]>;
	categories: Category[] = [];

  constructor(
    private router: Router,
    private store: Store,
		private categoryService: CategoryService
  ) {
		this.allProducts$ = this.store.select(selectProductList);
    this.products$ = this.allProducts$;

  }

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      if(!products || products.length === 0) {
        console.log('get products in ProductsComponent!');
        this.store.dispatch(ProductAction.getProductList());
      }
    });

		this.loadCategories();

		
  }

	private loadCategories(): void {
    this.categoryService.getCategoryList()
      .subscribe({
        next: (response: any) => {
          if (response.result) {
            // Add 'All' category and combine with fetched categories
            const allCategory: Category = { id: 0, name: 'All' };
            this.categories = [allCategory, ...response.result];
          }
        }
      });
  }


  onCategorySelect(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.products$ = this.allProducts$.pipe(
      map(products => {
        return products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesCategory = this.selectedCategory === 'All' || 
                                product.category === this.selectedCategory;
          return matchesSearch && matchesCategory;
        });
      })
    );
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.applyFilters();
  }

  gotoProductDetail(product: Product): void {
    this.router.navigate(['/auth/productdetail', product.id]);
  }
} 