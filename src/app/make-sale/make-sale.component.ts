import { Component, OnInit } from '@angular/core';
import {MakeSaleService} from '../_services/make-sale.service';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css']
})
export class MakeSaleComponent implements OnInit {
  sku = '';
  name = '';
  quantity = 1;
  sale: any = {
    saleItems: []
  };
  loyaltyCard = '';
  pointsAvailable = 0;
  usePoints = 0;
  discountCode = '';
  total = 0;
  cash = 0;
  loyaltyManager = {maxRedeemablePointsPerTransaction: 0};
  constructor(private makeSaleService: MakeSaleService) {
    this.makeSaleService.clearSaleItems().subscribe();
    this.getLoyaltyManager();
  }

  ngOnInit(): void {}

  pay(): void {
    this.makeSaleService.createSale(this.sale).subscribe(data => {
      this.total = data.price;
      const makeSaleContainer: HTMLCollectionOf<HTMLElement> =
          document.getElementsByClassName('make-sale-container') as HTMLCollectionOf<HTMLElement> ;
      makeSaleContainer[0].style.display = 'none';
      const payContainer: HTMLCollectionOf<HTMLElement> =
          document.getElementsByClassName('pay-container') as HTMLCollectionOf<HTMLElement> ;
      payContainer[0].style.display = 'block';
    });
  }
  complete(): void {
    this.makeSaleService.persistSale().subscribe(() => {
      this.sku = '';
      this.name = '';
      this.quantity = 1;
      this.sale = { saleItems: [] };
      this.loyaltyCard = '';
      this.pointsAvailable = 0;
      this.usePoints = 0;
      this.discountCode = '';
      this.total = 0;
      this.cash = 0;
      this.back();
    });
  }
  back(): void {
    this.makeSaleService.clearSaleItems().subscribe(() => {
      const payContainer: HTMLCollectionOf<HTMLElement> =
          document.getElementsByClassName('pay-container') as HTMLCollectionOf<HTMLElement> ;
      payContainer[0].style.display = 'none';
      const makeSaleContainer: HTMLCollectionOf<HTMLElement> =
          document.getElementsByClassName('make-sale-container') as HTMLCollectionOf<HTMLElement> ;
      makeSaleContainer[0].style.display = 'flex';
    });
  }
  clearSaleItems(): void {
    this.makeSaleService.clearSaleItems().subscribe(() => {
      this.sale.saleItems = [];
    });
  }
  removeSaleItem(index: number): void {
    if (this.sale.saleItems[index].quantity === 1){
      this.sale.saleItems.splice(index);
    }else{
      this.sale.saleItems[index].quantity = this.sale.saleItems[index].quantity - 1 ;
    }
  }
  addSaleItem(): void{
    const saleItem = this.sale.saleItems.find( (element: any) => {
      if (element.stock.sku === this.sku){
        element.quantity = element.quantity + this.quantity;
      }
      return element.stock.sku === this.sku;
    });
    if ( !saleItem){
      this.makeSaleService.getStockBySKU(this.sku).subscribe(data => {
        const tempSaleItem: any = {
          stock: {
            stock_id: data.stock_id,
            sku: data.sku,
            name: data.name,
            sellingPrice: data.sellingPrice
          },
          quantity: this.quantity
        };
        this.sale.saleItems.push(tempSaleItem);
      });
    }
    this.sku = '';
    this.name = '';
    this.quantity = 1;
  }
  addLoyaltyCard(): void {
    this.makeSaleService.addLoyaltyCard(this.loyaltyCard).subscribe( data => {
      this.pointsAvailable = data.points;
      this.usePoints = Math.min(data.points, this.loyaltyManager.maxRedeemablePointsPerTransaction);
    });
  }
  redeemPoints(): void {
    this.makeSaleService.usePoints(this.usePoints).subscribe(data => {
      this.total = data;
      // @ts-ignore
      document.getElementById('usePointsApply').style.display = 'none';
      // @ts-ignore
      document.getElementById('usePointsRemove').style.display = 'inline-block';
    });
  }
  applyDiscount(): void {
    this.makeSaleService.applyDiscount(this.discountCode).subscribe(data => {
      this.total = data;
      // @ts-ignore
      document.getElementById('applyDiscount').style.display = 'none';
      // @ts-ignore
      document.getElementById('applyDiscountRemove').style.display = 'inline-block';
    });
  }
  getLoyaltyManager(): void {
    this.makeSaleService.getLoyaltyManager().subscribe(data => {
      this.loyaltyManager = data[0];
    });
  }
  unRedeemPoints(): void {
    this.makeSaleService.unRedeemPoints().subscribe(data => {
      this.total = data;
      // @ts-ignore
      document.getElementById('usePointsRemove').style.display = 'none';
      // @ts-ignore
      document.getElementById('usePointsApply').style.display = 'inline-block';
    });
  }
  removeDiscount(): void{
    this.makeSaleService.removeDiscount().subscribe(data => {
      this.total = data;
      // @ts-ignore
      document.getElementById('applyDiscountRemove').style.display = 'none';
      // @ts-ignore
      document.getElementById('applyDiscount').style.display = 'inline-block';
    });
  }
}
