import { Component } from '@angular/core';
import { ExchangeComponent } from "./pages/exchange/exchange.component";

@Component({
  selector: 'app-root',
  imports: [ExchangeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'brl-exchange-rate';
}
