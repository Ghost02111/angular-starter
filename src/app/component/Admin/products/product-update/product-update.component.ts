import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../service/product-service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { CategoryService } from '../../../../service/category-service';
import * as ProductActions from '../../../../store/product/product.action'

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
  standalone: false ,
})
export class ProductUpdateComponent implements OnInit {
  name: string =''
  price: number = 0
  producer: string = ''
  country: string = ''
  category: string = ''
  validationErrors: any = []
  categoryId: number | undefined = 0

  id: number = 0 
  product: Product = new Product
  previewUrl: string | null = null 
  selectedFile: File | null = null

  categories: Category[] = []
  selectedCategoryId: number | null = null;
  

  constructor( private productService: ProductService ,
               private categoryService: CategoryService,
               private router: Router ,
               private store: Store ,
               private location: Location , 
               private route: ActivatedRoute ,
            ) { }

  ngOnInit(): void {
    this.categoryService
    .getCategoryList()
    .subscribe({
      next: (data) => {
        console.log('product-create categorydata from server:', data)
        this.categories = data.result ;
      }
    })

    this.id = this.route.snapshot.params['id'] ;
    this.productService.getProductById(this.id).subscribe({
       next: (data) => {console.log('Here is the getProductById and the data from server is:', data.result)
       this.product = this.productService.transform(data.result) ;
       console.log('converted data-product:', this.product),
       console.log('The categories', this.categories)
       this.categoryId = this.categories?.find((item: Category) => item.name === this.product.category )?.id;  
       console.log('the categoryId', this.categoryId)
      },
       error: (error) => {
        console.log('The error of the current product state:' , error) 
       }
    }

    );
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = Number(event.target.value) ;

    const selectedCategory = this.categories.find(
      (category) => category.id === this.selectedCategoryId
    );
    if(selectedCategory) {
      this.product.category = selectedCategory.name ;
    }

  }

  goBack() {
    this.location.back();
  }

  updateAction() {
    console.log('kk')
    console.log('updateImageUrl ==>', this.selectedFile)
    
    const formData: FormData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('name', this.product.name);
    formData.append('producer', this.product.producer);
    formData.append('price', this.product.price.toString());
    formData.append('country', this.product.country);
    formData.append('category', this.product.category);
    if( this.selectedFile ) {
      formData.append('productImage', this.selectedFile, this.selectedFile.name)
    }
      
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      // Dispatch the action
      
    this.store.dispatch(ProductActions.updateProduct({ product: formData }));
    this.location.back()
    // this.productService.update(currentId, payload).subscribe({
    //   next: (data) => {
    //     console.log('update res: ', data)
    //     this.router.navigateByUrl('/admin/products/list')
    //   },
    //   error: (error) => {
    //     console.log('update err: ', error)
    //   }
    // }) ;
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
