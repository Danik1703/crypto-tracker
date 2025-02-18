import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { CoinChartComponent } from './components/coin-chart/coin-chart.component';  
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { CoinSearchComponent } from './components/coin-search/coin-search.component';
import { CoinGeckoService } from './services/coin-gecko.service';
import { AppRoutingModule } from './app-routing.module';  
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent,
    CoinChartComponent,
    CoinSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    NgChartsModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [CoinGeckoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
