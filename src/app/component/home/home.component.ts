import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
	standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailSubscription: string = '';

  categories = [
    { 
      id: 1, 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
      itemCount: 1500
    },
    { 
      id: 2, 
      name: 'Fashion', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      itemCount: 2300
    },
    { 
      id: 3, 
      name: 'Home & Living', 
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a',
      itemCount: 1800
    },
    { 
      id: 4, 
      name: 'Sports', 
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
      itemCount: 1200
    }
  ];

  trendingProducts = [
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      currentPrice: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
      reviews: 128
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      currentPrice: 299.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
      reviews: 256
    },
    {
      id: 3,
      name: 'Premium Laptop',
      currentPrice: 1299.99,
      originalPrice: 1499.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
      reviews: 341
    },
    {
      id: 4,
      name: 'Headphones',
      currentPrice: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      reviews: 189
    }
  ];

  specialOffers = [
    {
      id: 1,
      title: 'Spring Sale',
      description: 'Get up to 40% off on new arrivals',
      code: 'SPRING40'
    },
    {
      id: 2,
      title: 'Free Shipping',
      description: 'On orders above $50',
      code: 'FREESHIP'
    }
  ];

  features = [
    {
      icon: 'fas fa-truck',
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: 'fas fa-undo',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: 'fas fa-lock',
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Round the clock assistance'
    }
  ];

  newArrivals = [
    {
      id: 1,
      name: 'Gaming Console Pro',
      currentPrice: 499.99,
      image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Smartphone 13 Pro',
      currentPrice: 999.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Wireless Charging Pad',
      currentPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3',
      badge: 'New'
    },
    {
      id: 4,
      name: 'Smart Home Hub',
      currentPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827',
      badge: 'New'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize any necessary data
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToSolutions(): void {
    this.router.navigate(['/solutions']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  registerForEvent(eventId: number): void {
    this.router.navigate(['/events/register', eventId]);
  }

  navigateToShop(): void {
    this.router.navigate(['/shop']);
  }

  navigateToNewArrivals(): void {
    this.router.navigate(['/new-arrivals']);
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/category', categoryId]);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(productId: number): void {
    // Implement add to cart logic
    console.log('Adding product to cart:', productId);
  }

  navigateToOffer(offerId: number): void {
    this.router.navigate(['/offers', offerId]);
  }

  subscribeNewsletter(): void {
    if (this.emailSubscription) {
      // Implement newsletter subscription logic
      console.log('Subscribing email:', this.emailSubscription);
      this.emailSubscription = '';
    }
  }

  viewAllProducts(): void {
    this.router.navigate(['/products']);
  }

  viewAllCategories(): void {
    this.router.navigate(['/products']);
  }

  addToWishlist(productId: number): void {
    console.log('Adding to wishlist:', productId);
    // Implement wishlist logic
  }

  quickView(productId: number): void {
    console.log('Quick view:', productId);
    // Implement quick view logic
  }

  viewAllNewArrivals(): void {
    this.router.navigate(['/new-arrivals']);
  }
} 