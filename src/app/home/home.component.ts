import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
  product: any;
  toBuyItems: [any] = [null];
  // @ts-ignore
  days: any = [];
  // @ts-ignore
  sales: any = [];
  chart: any;
  @ViewChild('chartCanvas')
  canvas: ElementRef<HTMLCanvasElement> | undefined ;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getInventoryCostPrice().subscribe(data => {this.inventoryCostPrice = data; });
    this.homeService.getInventorySellingPrice().subscribe(data => {this.inventorySalePrice = data; });
    this.homeService.getMonthsProfit().subscribe(data => {this.monthsProfit = data; });
    this.homeService.getToBuyItems().subscribe(data => {this.toBuyItems = data; });
    this.homeService.getLast7DaysOfSale().subscribe(data => {
      console.log(data) ;
      data.map((value: string) => {
        const daySale: string[] = value.split(',');
        this.days.push(daySale[0]);
        this.sales.push(+daySale[1]);
      });
      this.drawChart();
    });
  }

  drawChart(): void{
    if (this.chart) {
      this.chart.destroy();
    }
    // @ts-ignore
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'),  {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.days,
        datasets: [
          {label: '', fill: true, lineTension: 0.3, backgroundColor: '#A6CEE3  ',
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
}
