import { Component, OnInit } from '@angular/core';
import {MakeSaleService} from '../_services/make-sale.service';
import {StockService} from '../_services/stock.service';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css']
})
export class MakeSaleComponent implements OnInit {
  timer: any;
  saleOnlyUser = true;
  sku = '';
  name = '';
  stockName = '';
  payments: any[] = [];
  stocks: any[] = [];
  stock = {};
  sale: any = {
    price: 0,
    profit: 0,
    saleId: 0,
    saleItems: [],
    tax: 0
  };
  loyaltyCard = '';
  pointsAvailable = 0;
  usePoints = 0;
  discountCode = '';
  loyaltyManager = {maxRedeemablePointsPerTransaction: 0};
  showCustomer = false;
  showPaymentDialog = false;
  addPoints = true;
  change = 0;
  constructor(private makeSaleService: MakeSaleService, private stockService: StockService) {
    this.makeSaleService.clearSaleItems().subscribe();
    this.getLoyaltyManager();
  }

  ngOnInit(): void {}
  addCustomer(): void {}
  addCoupon(): void {}
  return(): void {}
  stockAndPrice(): void {}
  printLastReceipt(): void {}
  recentSales(): void {}
  suspendSale(): void {}
  restoreSale(): void {}
  logout(): void {}
  goHome(): void {}
  pay(): void {
    this.payments = [{amount: this.sale.price, type: ''}];
    this.showPaymentDialog = true;
  }
  hidePaymentDialog(): void{
    this.showPaymentDialog = false;
  }
  complete(): void {
    this.makeSaleService.persistSaleById(this.sale.saleId).subscribe(() => {
      this.sku = '';
      this.name = '';
      this.loyaltyCard = '';
      this.pointsAvailable = 0;
      this.usePoints = 0;
      this.discountCode = '';
      // new below
      this.sale = {
        price: 0,
        profit: 0,
        saleId: 0,
        saleItems: [],
        tax: 0
      };
      this.hidePaymentDialog();
    });
  }
  clearSaleItems(): void {
    this.makeSaleService.clearSaleById(this.sale.saleId).subscribe(() => {
      this.sale = {
        price: 0,
        profit: 0,
        saleId: 0,
        saleItems: [],
        tax: 0
      };
    });
  }
  removeSaleItem(index: number): void {
    this.makeSaleService.removeStock(this.sale.saleItems[index].stock, this.sale.saleId).subscribe(data => {
      this.sale = data;
    });
  }
  // addSaleItemBySKU(): void{
  //   const saleItem = this.sale.saleItems.find( (element: any) => {
  //     if (element.stock.sku === this.sku){
  //       element.quantity = element.quantity + this.quantity;
  //     }
  //     return element.stock.sku === this.sku;
  //   });
  //   if ( !saleItem){
  //     this.makeSaleService.getStockBySKU(this.sku).subscribe(data => {
  //       const tempSaleItem: any = {
  //         stock: {
  //           stock_id: data.stock_id,
  //           sku: data.sku,
  //           name: data.name,
  //           sellingPrice: data.sellingPrice
  //         },
  //       };
  //       this.sale.saleItems.push(tempSaleItem);
  //     });
  //   }
  //   this.sku = '';
  //   this.name = '';
  // }
  addLoyaltyCard(): void {
    this.makeSaleService.addLoyaltyCard(this.loyaltyCard).subscribe( data => {
      const loyaltyCardError: HTMLInputElement = document.getElementById('loyaltyCardError') as HTMLInputElement ;
      if ( data === null){
        loyaltyCardError.style.display = 'block';
        return;
      }
      loyaltyCardError.style.display = 'none';
      this.pointsAvailable = data.points;
      this.usePoints = Math.min(data.points, this.loyaltyManager.maxRedeemablePointsPerTransaction);
      const loyaltyCard: HTMLInputElement = document.getElementById('loyaltyCard') as HTMLInputElement ;
      loyaltyCard.readOnly = true;
    });
  }
  removeLoyaltyCard(): void {
    const loyaltyCardError: HTMLInputElement = document.getElementById('loyaltyCardError') as HTMLInputElement ;
    loyaltyCardError.style.display = 'none';
    const loyaltyCard: HTMLInputElement = document.getElementById('loyaltyCard') as HTMLInputElement ;
    loyaltyCard.readOnly = false;
  }
  redeemPoints(): void {
    if ( this.usePoints > this.maxRedeemablePoints){
      return;
    }
    this.makeSaleService.usePoints(this.usePoints).subscribe(data => {
      // @ts-ignore
      document.getElementById('usePointsApply').style.display = 'none';
      // @ts-ignore
      document.getElementById('usePointsRemove').style.display = 'inline-block';
      const usePoints: HTMLInputElement = document.getElementById('usePoints') as HTMLInputElement ;
      usePoints.readOnly = true;
    });
  }
  // applyDiscount(): void {
  //   this.makeSaleService.applyDiscount(this.discountCode).subscribe(data => {
  //     // @ts-ignore
  //     document.getElementById('applyDiscount').style.display = 'none';
  //     // @ts-ignore
  //     document.getElementById('applyDiscountRemove').style.display = 'inline-block';
  //     const usePoints: HTMLInputElement = document.getElementById('discountCode') as HTMLInputElement ;
  //     usePoints.readOnly = true;
  //   });
  // }
  getLoyaltyManager(): void {
    this.makeSaleService.getLoyaltyManager().subscribe(data => {
      this.loyaltyManager = data[0];
    });
  }
  unRedeemPoints(): void {
    this.makeSaleService.unRedeemPoints().subscribe(data => {
      // @ts-ignore
      document.getElementById('usePointsRemove').style.display = 'none';
      // @ts-ignore
      document.getElementById('usePointsApply').style.display = 'inline-block';
      const usePoints: HTMLInputElement = document.getElementById('usePoints') as HTMLInputElement ;
      usePoints.readOnly = false;
    });
  }
  removeDiscount(): void{
    this.makeSaleService.removeDiscount().subscribe(data => {
      // @ts-ignore
      document.getElementById('applyDiscountRemove').style.display = 'none';
      // @ts-ignore
      document.getElementById('applyDiscount').style.display = 'inline-block';
      const usePoints: HTMLInputElement = document.getElementById('discountCode') as HTMLInputElement ;
      usePoints.readOnly = false;
    });
  }
  get maxRedeemablePoints(): number {
    return Math.min(this.loyaltyManager.maxRedeemablePointsPerTransaction, this.pointsAvailable);
  }
  getStocks(): void{
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.stockService.getStockByName(this.stockName, 0, 20)
        .subscribe(data => {
          this.stocks = data.content;
          if (this.stocks.length === 1){
            this.stock = this.stocks[0];
            this.stocks = [];
          }
        });
    }, 400);
  }
  addStock(): void{
    this.makeSaleService.addStock(this.stock, this.sale.saleId).subscribe(data => {
      this.sale = data;
      this.stock = {};
      this.stockName = '';
    });
  }
  calcChange(): void {
    let total = 0;
    this.payments.forEach( payment => total = total + payment.amount);
    this.change = total - this.sale.price;
  }
  split(): void{
    this.payments.push({amount: 0, type: ''});
  }
}
