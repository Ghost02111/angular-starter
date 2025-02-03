import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-payment',
	standalone: false,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  loading = false;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private store: Store
  ) {}
	cartTotal$ = 100;


  ngOnInit() {}

  async handlePayment() {
    this.loading = true;
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      alert('Payment successful!');
      this.router.navigate(['/order-confirmation']);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      this.loading = false;
    }
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    if (value.length > 16) value = value.substr(0, 16);
    const parts = value.match(/.{1,4}/g) || [];
    this.cardNumber = parts.join(' ');
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substr(0, 4);
    if (value.length > 2) {
      value = value.substr(0, 2) + '/' + value.substr(2);
    }
    this.expiryDate = value;
  }

  formatCVV(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.substr(0, 3);
    this.cvv = value;
  }
} 