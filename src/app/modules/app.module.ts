import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MatPaginatorModule } from '@angular/material/paginator';
// import { Location } from "@angular/common
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BaseUrlInterceptor } from "../helper/http.interceptor";
//components
import { AppComponent } from "../app.component";
import { LoginComponent } from "../component/login/login.component";
import { RegisterComponent } from "../component/register/register.component";
//store
import { AdminModule } from "./admin.module";
import { LandingPageComponent } from "../component/landing-page/landing-page.component";
import { ProductCardComponent } from "../product.card/product.card.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { CartDetailComponent } from "../component/user/cart/cart.detail/cart.detail.component";
import { CartProductCardComponent } from "../component/user/cart/cart.product-card/cart.product-card.component";
import { CartEffect } from "../store/cart/cart.effect";
import { cartReducer } from "../store/cart/cart.reducer";
import { HomeComponent } from "../component/home/home.component";
import { ProductsComponent } from '../component/products/products.component';
import { PaymentComponent } from "../component/payment/payment.component";

@NgModule ({
    declarations: [
        AppComponent ,
        LoginComponent ,
        RegisterComponent ,
        LandingPageComponent ,
        ProductDetailComponent ,
        CartDetailComponent ,
				HomeComponent,
        ProductsComponent,
				PaymentComponent
    ] ,
    imports: [
    AdminModule,
    BrowserModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    // // This would normally contain the root state, e.g., `StoreModule.forRoot({ app: appReducer })`
    // StoreModule.forRoot({ auth: authReducer }),
    // EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    BrowserAnimationsModule,
    MatPaginatorModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductCardComponent,
    CartProductCardComponent,
		FormsModule] ,
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
        Location ,
      ],
    bootstrap: [AppComponent] ,

})

export class AppModule { }