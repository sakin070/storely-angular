import { Component, OnInit } from '@angular/core';
import {MakeSaleService} from '../_services/make-sale.service';
import {StockService} from '../_services/stock.service';
import {formatDate} from '@angular/common';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {SessionService} from '../_services/session.service';

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
  saleId = NaN;
  stocks: any[] = [];
  sales: any[] = [];
  receipt: any = {saleItems: []};
  returns: any[] = [];
  payments: any[] = [];
  clockOutRoles: string[] = ['ADMIN', 'MANAGER'];
  showClockOutAuth = false;
  showSessionDetails = false;
  stock = {};
  sale: any = {
    price: 0,
    profit: 0,
    saleId: 0,
    saleItems: [],
    tax: 0,
    discountValue: 0,
    valueOfPointsRedeemed: 0
  };
  tempSale: any = {
    price: 0,
    profit: 0,
    saleId: 0,
    saleItems: [],
    tax: 0,
    discountValue: 0,
    valueOfPointsRedeemed: 0
  };
  sessionDetails = {
    openingBalance: 0,
    additions: 0,
    remittanceSum: 0,
    cashSale: 0,
    posSale: 0,
    cashReturn: 0,
    totalReturn: 0,
    posReturn: 0,
    pointsRedeemedValue: 0,
    totalSale: 0,
    discountValue: 0
  };
  loyaltyCard = '';
  usePoints = 0;
  discountCode = '';
  loyaltyManager = {maxRedeemablePointsPerTransaction: 0};
  showCustomer = false;
  showPaymentDialog = false;
  showAddCashDialogue = false;
  showRemitCashDialogue = false;
  addCashAmount = 0;
  remitCashAmount = 0;
  addPoints = true;
  change = 0;
  saleItemIndex = 0;
  suspended = false;
  viewSales = false;
  stockAndPrice = false;
  returnStock = false;
  showSales = true;
  disableButtons = false;
  failedReturn = false;
  posTotal = 0;
  cashTotal = 0;
  saleTotal = 0;
  cashReturn = 0;
  showCustomerDialogue = false;
  showDiscountDialogue = false;
  showAddCashAuthDialogue = false;
  showRemitCashAuthDialogue = false;
  openingBalance = 0;
  newSessionDialogue = true;
  saleSession: any;
  returnPaymentType = 'CASH';
  constructor(private makeSaleService: MakeSaleService, private stockService: StockService,
              private tokenService: TokenStorageService, private router: Router, private sessionService: SessionService) {
    this.makeSaleService.clearSaleItems().subscribe();
    this.getLoyaltyManager();
    this.tokenService.getUser().roles.forEach( (role: { name: string; }) => {
      if ( role.name === 'ADMIN' || role.name === 'MANAGER'){
        this.saleOnlyUser = false;
      }
    });
  }

  ngOnInit(): void {
    this.sessionService.getCurrentSession().subscribe(data => {
      this.saleSession = data;
      this.newSessionDialogue = false;
    }, () => {
      this.newSessionDialogue = true;
    });
    this.selectSKUInput();
  }
  addCustomer(): void {
    this.showCustomerDialogue = true;
    setTimeout(() => {
      const input = document.getElementById('loyaltyCard') as HTMLInputElement;
      input.focus();
      input.select();
    }, 5);
  }
  addDiscount(): void {
    this.showDiscountDialogue = true;
    setTimeout(() => {
      const input = document.getElementById('discountCode') as HTMLInputElement;
      input.focus();
      input.select();
    }, 5);
  }
  hideDiscountDialogue(): void{
    this.showDiscountDialogue = false;
    this.selectSKUInput();
  }
  addDiscountCode(): void {
    this.makeSaleService.applyDiscount(this.discountCode, this.sale.saleId).subscribe( data => {
      this.sale = data;
      this.hideDiscountDialogue();
      this.discountCode = '';
      this.saleTotal  = this.sale.price - this.sale.discountValue + this.sale.tax;
    });
  }
  return(): void {
    this.returnStock = true;
    this.failedReturn = false;
  }
  hideReturn(): void {
    this.returnStock = false;
    this.receipt = {saleItems: []};
    this.cashReturn = 0;
    this.saleId = NaN;
    this.selectSKUInput();
  }
  showStockAndPrice(): void {
    this.stockAndPrice = true;
  }
  hideStockAndPrice(): void {
    this.stockAndPrice = false;
    this.stockName = '';
    this.stocks = [];
    this.selectSKUInput();
  }
  printLastReceipt(): void {}
  recentSales(): void {
    this.cashTotal = 0;
    this.posTotal = 0;
    this.makeSaleService.getSaleByUserAndDate(this.tokenService.getUser().id, formatDate(new Date() , 'yyyy-MM-dd', 'en-CA'))
      .subscribe(data => {
        this.sales = data;
        data.map((sale: { payments: any[]; }) => {
          sale.payments.map(payment => {
            if (payment.type === 'POS') {
              this.posTotal = this.posTotal + payment.amount;
            }else {
              this.cashTotal = this.cashTotal + payment.amount;
            }
          });
        });
        this.viewSales = true;
      });
  }
  showSaleItems(index: number): void {
    this.saleItemIndex = index;
    this.showSales = false;
  }
  suspendSale(): void {
    this.tempSale = JSON.parse(JSON.stringify(this.sale));
    this.sale = {
      price: 0,
      profit: 0,
      saleId: 0,
      saleItems: [],
      tax: 0,
      discountValue: 0
    };
    this.suspended = true;
  }
  restoreSale(): void {
    this.sale = JSON.parse(JSON.stringify(this.tempSale));
    this.tempSale = {
      price: 0,
      profit: 0,
      saleId: 0,
      saleItems: [],
      tax: 0,
      discountValue: 0
    };
    this.suspended = false;
  }
  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('/login');
  }
  goHome(): void {
    this.router.navigateByUrl('/home');
  }
  pay(): void {
    this.saleTotal  = this.sale.price - this.sale.discountValue - this.sale.valueOfPointsRedeemed + this.sale.tax ;
    this.payments = [{amount: this.saleTotal, type: 'CASH'}];
    this.showPaymentDialog = true;
  }
  hidePaymentDialog(): void{
    this.showPaymentDialog = false;
    this.selectSKUInput();
  }
  hideViewSaleDialog(): void{
    this.viewSales = false;
    this.selectSKUInput();
  }
  hideSaleItems(): void{
    this.showSales = true;
    this.selectSKUInput();
  }
  complete(): void {
    this.makeSaleService.persistSaleById(this.sale.saleId, this.payments).subscribe(() => {
      this.sku = '';
      this.name = '';
      this.loyaltyCard = '';
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
      this.saleTotal = 0;
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
      this.saleTotal = 0;
    });
  }
  printSale(): void{
    this.makeSaleService.printSale(this.saleItemIndex).subscribe();
  }
  removeSaleItem(index: number): void {
    this.makeSaleService.removeStock(this.sale.saleItems[index].stock, this.sale.saleId).subscribe(data => {
      this.sale = data;
    });
    this.selectSKUInput();
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
      this.loyaltyManager = data;
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

  getStocks(): void{
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.stockService.getStockByName(this.stockName, 0, 15)
        .subscribe(data => {
          this.stocks = data.content;
          if (this.stocks.length === 1){
            this.stock = this.stocks[0];
            // this.stocks = [];
          }
        });
    }, 400);
  }
  getSale(): void{
    this.makeSaleService.getSale(this.saleId)
      .subscribe(data => {
        this.receipt = data;
        this.returns = [];
        // @ts-ignore
        this.receipt.saleItems.forEach((saleItem) => this.returns.push(
          {stockId: saleItem.stock.stockId, quantity: 0, salePrice: saleItem.unitSellPrice, quantitySold: saleItem.quantity} ));
      });
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
    this.change = total - this.saleTotal;
  }
  split(): void{
    this.payments.push({amount: 0, type: 'CASH'});
  }
  calcReturn(): void {
    this.cashReturn = 0;
    for (const return1 of this.returns) {
      return1.quantity = Math.min(return1.quantity, return1.quantitySold);
      this.cashReturn = this.cashReturn + (return1.salePrice * return1.quantity);
    }
  }
  makeReturn(): void {
    this.disableButtons = true;
    const saleReturn = {
      returnItems: this.returns,
      payment: {amount: this.cashReturn, type: this.returnPaymentType },
      saleSession: this.saleSession
    };
    this.makeSaleService.addReturn(this.saleId, saleReturn).subscribe(() => {
        this.disableButtons = false;
        this.hideReturn();
      }, () => {
        this.failedReturn = true;
        this.disableButtons = false;
    });
  }
  addStockBySKU(): void {
    this.makeSaleService.addStockBySKU(this.sku, this.sale.saleId).subscribe(data => {
      this.sale = data;
      this.stock = {};
      this.stockName = '';
      this.sku = '';
    }, err => {
      this.sku = '';
    });
  }
  selectSKUInput(): void {
    const input = document.getElementById('sku') as HTMLInputElement;
    input.focus();
    input.select();
  }
  hideCustomerDialogue(): void{
    this.showCustomerDialogue = false;
    this.selectSKUInput();
  }
  addLoyaltyCard(): void {
    this.makeSaleService.addLoyaltyCard(this.loyaltyCard, this.sale.saleId).subscribe( data => {
      this.sale = data;
      this.hideCustomerDialogue();
      this.loyaltyCard = '';
      this.usePoints = Math.min(this.loyaltyManager.maxRedeemablePointsPerTransaction, this.sale.loyaltyCard.points);
    });
  }
  redeemPoints(): void {
    this.makeSaleService.usePoints(this.usePoints, this.sale.saleId).subscribe(data => {
      this.sale = data;
      this.addPoints = false;
      this.saleTotal = this.sale.price - this.sale.discountValue - this.sale.valueOfPointsRedeemed + this.sale.tax;
      this.payments = [{amount: this.saleTotal, type: 'CASH'}];
      this.calcChange();
    });
  }
  unRedeemPoints(): void {
    this.makeSaleService.unRedeemPoints(this.sale.saleId).subscribe(data => {
      this.sale = data;
      this.addPoints = true;
      this.saleTotal = this.sale.price - this.sale.discountValue + this.sale.tax;
      this.payments = [{amount: this.saleTotal, type: 'CASH'}];
      this.calcChange();
    });
  }
  createSaleSession(): void {
    this.sessionService.createNewSession({openingBalance: this.openingBalance}).subscribe(data => {
      this.saleSession = data;
      this.newSessionDialogue = false;
    });
  }
  clickClockOut(): void{

    this.showClockOutAuth = true;
  }
  hideClockOut(): void{
    this.showClockOutAuth = false;
  }
  handleValidateClockOutAuth(response: boolean): void{
    if (response){
      this.sessionService.getSessionDetails().subscribe(data => {
        this.sessionDetails = data;
        this.showSessionDetails = true;
        this.hideClockOut();
      });
    }else{
      this.hideClockOut();
    }
  }
  hideSessionDetails(): void{
    this.showSessionDetails = false;
  }
  closeSession(): void{
    this.sessionService.closeNewSession().subscribe(() => {
      this.showSessionDetails = false;
      if (this.saleOnlyUser){
        this.logout();
      }else{
        this.goHome();
      }
    });
  }
  addCash(): void{
    this.sessionService.addCash(this.addCashAmount).subscribe(() => {
      this.addCashAmount = 0;
      this.hideAddCashDialogue();
    });
  }
  hideAddCashDialogue(): void{
    this.showAddCashDialogue = false;
  }
  hideAddCashAuth(): void{
    this.showAddCashAuthDialogue = false;
  }
  showAddCashAuth(): void{
    this.showAddCashAuthDialogue = true;
  }
  handleValidateAddCashAuth(response: boolean): void{
    if (response){
      this.showAddCashDialogue = true;
    }
    this.hideAddCashAuth();
  }
  showRemitCashAuth(): void{
    this.showRemitCashAuthDialogue = true;
  }
  hideRemitCashAuth(): void{
    this.showRemitCashAuthDialogue = false;
  }
  hideRemitCash(): void{
    this.showRemitCashDialogue = false;
  }
  handleValidateRemitCashAuth(response: boolean): void{
    if (response){
      this.showRemitCashDialogue = true;
    }
    this.hideRemitCashAuth();
  }
  remitCash(): void{
    this.sessionService.remitCash({
      session: this.saleSession,
      amount: this.remitCashAmount,
      collector: JSON.parse(sessionStorage.getItem('authorizingUser') as string)
    })
    .subscribe(data => {
      this.saleSession = data;
      this.remitCashAmount = 0;
      this.hideRemitCash();
    });
  }
}
