import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {HomeService} from '../_services/home.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inventorySalePrice = '';
  inventoryCostPrice = '';
  monthsProfit = '';
  timer: any;
  product: any;
  productData = {};
  products: any[] = [];
  // @ts-ignore
  toBuyItems: [any] = [];
  // @ts-ignore
  days: any = [];
  // @ts-ignore
  sales: any = [];
  chart: any;
  @ViewChild('chartCanvas')
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getInventoryCostPrice().subscribe(data => {
      this.inventoryCostPrice = data;
    });
    this.homeService.getInventorySellingPrice().subscribe(data => {
      this.inventorySalePrice = data;
    });
    this.homeService.getMonthsProfit().subscribe(data => {
      this.monthsProfit = data;
    });
    this.homeService.getToBuyItems().subscribe(data => {
      this.toBuyItems = data;
    });
    this.homeService.getLast7DaysOfSale().subscribe(data => {
      data.map((value: string) => {
        const daySale: string[] = value.split(',');
        this.days.push(daySale[0]);
        this.sales.push(+daySale[1]);
      });
      this.drawChart();
    });
  }
  clearToBuyItems(): void{
    this.homeService.clearToBuyItems().subscribe(() => {
      this.homeService.getToBuyItems().subscribe(data => { this.toBuyItems = data; });
    });
  }

  deleteToBuyItem(buyItemId: number): void {
    this.homeService.deleteToBuyItem(buyItemId).subscribe(() => {
      this.homeService.getToBuyItems().subscribe(toBuyItems => {
        this.toBuyItems = toBuyItems;
      });
    });
  }

  drawChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    // @ts-ignore
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.days,
        datasets: [
          {
            label: '', fill: true, lineTension: 0.3, backgroundColor: '#A6CEE3  ',
            borderColor: '#A6CEE3', borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0,
            borderJoinStyle: 'miter', pointBorderWidth: 10, pointHoverRadius: 5, pointHoverBackgroundColor: 'rgb(0, 0, 0)',
            pointHoverBorderColor: 'rgba(220, 220, 220, 1)', pointHoverBorderWidth: 2, pointRadius: 1, pointHitRadius: 10,
            data: this.sales,
          },
        ]
      },

      // Configuration options go here
      options: {}
    });
  }

  getProduct(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.homeService.getBuyItemByName(this.product, 0, 15)
        .subscribe(data => {
          this.products = data.content;
          if (this.products.length === 1) {
            this.productData = this.products[0];
            this.product = this.products[0].name;
            this.products = [];
          }
        });
    }, 400);
  }

  addProduct(): void {
    this.homeService.addBuyItem({stock: this.productData}).subscribe(
      () => {
        this.product = '';
        this.products = [];
        this.productData = {};
        this.homeService.getToBuyItems().subscribe(data => {
          this.toBuyItems = data;
        });
      },
      () => {
        this.product = '';
        this.products = [];
        this.productData = {};
      });
  }
  downloadBuyItems(): void {
    this.homeService.downloadBuyItems().subscribe(
      data => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'buyItems.pdf';
        link.click();
      }
    );
  }
}
