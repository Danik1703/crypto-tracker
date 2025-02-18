import { Component, OnInit } from '@angular/core';
import { CoinGeckoService } from 'src/app/services/coin-gecko.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coins: any[] = [];
  searchTerm: string = ''; 
  selectedCoinId: string | null = null; 

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins(): void {
    this.coinGeckoService.getCoins().subscribe(
      (data: any[]) => {
        console.log('Data loaded:', data);  
        this.coins = data;
      },
      (error) => {
        console.error('Error loading data:', error);  
      }
    );
  }

  filterCryptocurrencies(): any[] {
    console.log('Filtering cryptocurrencies with search term:', this.searchTerm); 
    return this.coins.filter(coin =>
      coin.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectCoin(coinId: string): void {
    this.selectedCoinId = coinId;
  }

  searchCoins(): void {
    this.coinGeckoService.searchCoins(this.searchTerm).subscribe((data: any) => {
      this.coins = data.coins;
    });
  }
}
