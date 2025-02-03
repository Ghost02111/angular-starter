import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:4000/api'; // Your backend API URL

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, { amount });
  }

  confirmPayment(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-payment`, { paymentIntentId });
  }
} 