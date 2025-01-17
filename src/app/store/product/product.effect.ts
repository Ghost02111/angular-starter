import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
// import { Action } from "rxjs/internal/scheduler/Action";

import { ProductService } from "../../service/product-service";
import * as ProductAction from '../product/product.action'
import { mergeMap, map , catchError, of } from "rxjs";

import { tap } from "rxjs/operators";

@Injectable() 

export class ProductEffect {
    constructor(
        private action$: Actions ,
        private productService: ProductService ,
    ) {}

    createProduct$ = createEffect(() => {

        console.log('Here is the createOne function of the productEffect!')
        return inject(Actions)
            .pipe(
              ofType(ProductAction.createProduct) ,
              mergeMap(({ product }) => {
                console.log('Mergemap product', product)
                return this.productService.createNewProduct(product).pipe(

                    map((createdProduct) => ProductAction.createProductSuccess({product: createdProduct.new_product})),
                    catchError((error) => of(ProductAction.createProductFailure({error: error}))),
                  )
                } 
              )  
            )
    })

    getProductList$ = createEffect(() => {
      console.log('Here is the getProductList effect!')
      return inject(Actions)
      .pipe(
        ofType(ProductAction.getProductList) ,
        mergeMap(() => {
          console.log('getproductList mergemap Effect')
          return this.productService.getProductList().pipe (
            map((response) => ProductAction.getProductListSuccess({products: response.result})) ,
            catchError((error) => of(ProductAction.getProductListFailure({ error }))) ,
          )
        })
      )
    })

    deleteProduct$ = createEffect(() => {
      console.log('Here is the deleteProduct Effect!')
      return inject(Actions)
        .pipe (
          ofType(ProductAction.deleteProduct) ,
          mergeMap(({ id }) => (
            this.productService.deleteCurrentProduct(id).pipe (
              map((res) => ProductAction.deleteProductSuccess({id})) ,
              catchError((error) => of(ProductAction.deleteProductFailure({error})))
            ) 
          ))
        )
    })

    updateProduct$ = createEffect(() => {

      return inject(Actions)
      .pipe (
          tap (() => { console.log('Here is updateProduct Effect!') }) , 
          ofType(ProductAction.updateProduct) ,
          mergeMap(( { product } ) => {
            
            const id = product.get('id') as string ;
            console.log('update formdata payload', id)
            return  this.productService.update(Number(id) , product ).pipe(
               map((res) => {
                console.log('res', res) 
                return ProductAction.updateProductSuccess({ product: res.result } )}) ,
              catchError((error) => of(ProductAction.updateProductFailure({ error }))) ,
            
          )}
         )
        )
    })
}