import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ExchangeModel } from '../../models/exchange-model';

@Component({
  selector: 'app-exchange',
  imports: [CommonModule, MatInputModule, MatButton, MatProgressSpinner],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.css'
})
export class ExchangeComponent {
  history: any[] = [];
  isLoading = false;
  showHistory = false;
  show = false;

  ExchangeModel = new ExchangeModel();
  exchangeModel: ExchangeModel | null = null;

  constructor(private exchangeService: ExchangeService) { }

  getCurrentRate(currencyCode: string) {
    if (!currencyCode) return;
    this.isLoading = true;
    this.show = true;

    this.exchangeService.getCurrentRate(currencyCode).subscribe((data: any) => {
      this.exchangeModel = data;
      console.log(this.exchangeModel);

      this.showHistory = false;
      this.isLoading = false;

      this.getHistory(currencyCode);
    });
  }

  getHistory(currencyCode: string) {
    this.exchangeService.getHistory(currencyCode).subscribe(
      (data: any) => {

        const historyArray = data?.data ?? data;

        if (!Array.isArray(historyArray)) {
          console.warn('API não retornou um array válido:', data);
          this.history = [];
          return;
        }

        const today = new Date();
        const daysAgo30 = new Date();
        daysAgo30.setDate(today.getDate() - 30);

        this.show = false;

        this.history = historyArray
          .map((d: any) => ({
            date: new Date(d.date),
            closeH: d.close,
            openH: d.open,
            high: d.high,
            low: d.low
          }))
          .filter(d => d.date >= daysAgo30);
      },
      (error) => {
        console.error('Erro ao buscar histórico:', error);
        this.history = [];
        this.showHistory = true;
      }
    );
  }
}
