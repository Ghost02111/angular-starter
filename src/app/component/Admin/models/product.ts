export class Product {
    id: number ;
    name: string ;
    price: number ;
    producer: string ;
    country: string ;
    category: string ;
    imgUrl: string;
    quantity?: number;
     constructor (
         id: number = 0 ,
         name: string = '',
         price: number = 0,
         producer: string = '',
         country: string = '',
         category: string = '' ,
         imgUrl: string = '' ,
         quantity: number = 1
    ) {
        this.id = id ;
        this.name = name ;
        this.price = price ;
        this.producer = producer ;
        this.country = country ;
        this.category = category ;
        this.imgUrl = imgUrl ;
        this.quantity = quantity;
    }
} 