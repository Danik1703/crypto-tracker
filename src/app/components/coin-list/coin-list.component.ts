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
  previousPrices: { [key: string]: number } = {};
  
  // Курсы валют (примерные значения, можно обновлять через API)
  usdToEur: number = 0.92;
  usdToUah: number = 39.5;

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins(): void {
    this.coinGeckoService.getCoins().subscribe(
      (data: any[]) => {
        console.log('Дані завантажено:', data);
        this.coins = data;
      },
      (error) => {
        console.error('Помилка завантаження даних:', error);
      }
    );
  }

  filterCryptocurrencies(): any[] {
    console.log('Фільтрація криптовалют за запитом:', this.searchTerm);
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

  getPriceChangeClass(coin: any): string {
    if (!this.previousPrices[coin.id]) {
      this.previousPrices[coin.id] = coin.current_price;
      return '';
    }

    const previousPrice = this.previousPrices[coin.id];
    this.previousPrices[coin.id] = coin.current_price;

    return coin.current_price > previousPrice ? 'price-up' : 'price-down';
  }

  convertCurrency(priceUsd: number, currency: string): string {
    switch (currency) {
      case 'EUR':
        return (priceUsd * this.usdToEur).toFixed(2) + ' €';
      case 'UAH':
        return (priceUsd * this.usdToUah).toFixed(2) + ' грн';
      default:
        return '$' + priceUsd.toFixed(2);
    }
  }
}
