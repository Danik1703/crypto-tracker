import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCoins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coins/markets`, {
      params: { vs_currency: 'usd' }
    });
  }
  getCoinChartData(coinId: string, days: number = 1) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days.toString()
      }
    });
  }
  

  searchCoins(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: { query: query }
    });
  }
}
