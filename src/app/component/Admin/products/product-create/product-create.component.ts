import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';

import { ProductService } from '../../../../service/product-service';
import * as ProductActions from '../../../../store/product/product.action';
import { selectCreateProductError } from '../../../../store/product/product.selector'
import { Category } from '../../models/category';
import { CategoryService } from '../../../../service/category-service';

@Component({
  selector: 'app-product-create',
  standalone: false ,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{
  name: string =''
  price: number = 0
  producer: string = ''
  country: string = ''
  category: string = ''
  validationErrors: any = []

  categories: Category[] = []
  selectedCategoryId: number = 1;
  
  previewUrl: string | null = null ;
  selectedFile: File | null = null ;



  constructor(
    public productService: ProductService ,
    private categoryService: CategoryService ,
    private router: Router ,
    private store: Store ,
    private location: Location ,
  ) {

  }

  
  ngOnInit(): void {
    this.categoryService
      .getCategoryList()
      .subscribe({
        next: (data) => {
          console.log('product-create categorydata from server:', data)
          this.categories = data.result ;
        }
      })
  }



  sendAction() {
    
    if( this.selectedFile ) {
      const formData: FormData = new FormData();
      formData.append('name', this.name);
      formData.append('producer', this.producer);
      formData.append('price', this.price.toString());
      formData.append('country', this.country);
      formData.append('category', this.category);
      formData.append('productImage', this.selectedFile, this.selectedFile.name)
      
      // Dispatch the action
      this.store.dispatch(ProductActions.createProduct({ product: formData }));

    }
    // this.store.select(selectCreateProductError).subscribe((error) => {
    //   console.log('this is the error from the server =>', error)
    // })
    this.location.back();

  }

  goBack(): void {
    this.location.back();
  }

  logoutAction(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  onFileSelected(event: Event) : void {
    const input = event.target as HTMLInputElement ;
    console.log('input =>', input.value) ;
    if( input.files && input.files.length > 0 ) {
      const file = input.files[0] ;
      // Check if the selected file is an image
      if( file.type.startsWith('image/') ) {
        this.selectedFile = file ;

        const reader = new FileReader() ;
        console.log('reader =>', reader )
        reader.onload = () => {
          this.previewUrl = reader.result as string ;
        };
        console.log('reader.result =>', this.previewUrl)
        reader.readAsDataURL(file);
      } else {
        alert('You must select the image file, please try again!') ;
        input.value = ''; // clear the input
        this.previewUrl = null ;
      }
    }

  }
}
    // this.productService.createNewProject(payload).subscribe({
    //   next: (data) => {
    //     console.log('I received this data from server!' , data)
    //   } ,
    //   error: (error) => {
    //     console.log('There is a error like this: ', error)
    //   }
  
    // })
