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
  chartOptions: ChartOptions = {
    responsive: true,
  };
  chartType: ChartType = 'line';
  loading: boolean = false;
  error: string | null = null;

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
        this.chartData = {
          labels: this.chartLabels,
          datasets: [
            {
              label: 'Price in USD',
              data: data.prices.map((price: number[]) => price[1]),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        };
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading chart data';
        this.loading = false;
      }
    );
  }
}
