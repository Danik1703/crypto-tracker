import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinGeckoService } from 'src/app/services/coin-gecko.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-coin-chart',
  templateUrl: './coin-chart.component.html',
  styleUrls: ['./coin-chart.component.css']
})
export class CoinChartComponent implements OnInit {
  coinId: string = ''; 
  chartData: ChartData = { datasets: [] };
  chartLabels: string[] = [];
  chartOptions: ChartOptions = { responsive: true };
  chartType: ChartType = 'line';
  loading: boolean = false;
  error: string | null = null;

  usdToEur: number = 0.92;
  usdToUah: number = 39.5;

  selectedCurrency: string = 'usd';

  constructor(
    private route: ActivatedRoute, 
    private coinGeckoService: CoinGeckoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.coinId = params['id']; 
      this.loadChartData();  
    });
  }

  loadChartData(): void {
    if (!this.coinId) {
      this.error = 'No coinId provided!';
      return;
    }

    this.loading = true;
    this.error = null;

    this.coinGeckoService.getCoinChartData(this.coinId).subscribe(
      (data: any) => {
        this.chartLabels = data.prices.map((price: number[]) => new Date(price[0]).toLocaleTimeString());
        this.updateChartData(data.prices);
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading chart data';
        this.loading = false;
      }
    );
  }

  updateChartData(prices: number[][]): void {
    let conversionRate = 1; // Для USD
    let currencyLabel = 'USD';
    let borderColor = 'rgb(75, 192, 192)';

    if (this.selectedCurrency === 'eur') {
      conversionRate = this.usdToEur;
      currencyLabel = 'EUR';
      borderColor = 'rgb(255, 159, 64)';
    } else if (this.selectedCurrency === 'uah') {
      conversionRate = this.usdToUah;
      currencyLabel = 'UAH';
      borderColor = 'rgb(255, 99, 132)';
    }

    this.chartData = {
      labels: this.chartLabels,
      datasets: [
        {
          label: `Ціна в ${currencyLabel}`,
          data: prices.map((price: number[]) => price[1] * conversionRate),
          fill: false,
          borderColor: borderColor,
          tension: 0.1
        }
      ]
    };
  }

  onCurrencyChange(): void {
    this.loadChartData();
  }
}
