import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  private apiKey = 'RVZG0GHEV2KORLNA';

  constructor(private http: HttpClient) {}

   getCurrentRate(toSymbol: string): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('from_symbol', 'BRL')
      .set('to_symbol', toSymbol);

    return this.http.get(`${this.apiUrl}/currentExchangeRate`, { params });
  }

  getHistory(toSymbol: string): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('from_symbol', 'BRL')
      .set('to_symbol', toSymbol);

    return this.http.get(`${this.apiUrl}/dailyExchangeRate`, { params });
  }
}
