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

  getCoinChartData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/coins/${id}/market_chart`, {
      params: { vs_currency: 'usd', days: '7' }
    });
  }

  searchCoins(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: { query: query }
    });
  }
}
