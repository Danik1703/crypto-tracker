import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';


import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { PlatformHelper } from '@natec/mef-dev-platform-connector';



function init(http: HttpClient, translate: TranslateService) {
  return () => forkJoin([
    of({}),
    translate.use(localStorage.getItem('language') || 'en')
  ]);
}


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
    HttpClientModule,
    TranslateModule.forRoot()
  ],
  providers: [
    CoinGeckoService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [HttpClient, TranslateService],
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useFactory: () => PlatformHelper.getAppBasePath()
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
