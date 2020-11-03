import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TopbarComponent } from './layout/topbar/topbar.component';

import { PrimeModules } from './primeng.imports';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CheckboxFilterComponent } from './filters/checkbox-filter/checkbox-filter.component';
import { RangeFilterComponent } from './filters/range-filter/range-filter.component';
import { SearchListFilterComponent } from './filters/search-list-filter/search-list-filter.component';
import { FormsModule } from '@angular/forms';
import { DropdownFilterComponent } from './filters/dropdown-filter/dropdown-filter.component';
import { ButtonFilterComponent } from './filters/button-filter/button-filter.component';
import { PieChartComponent } from './visualizations/pie-chart/pie-chart.component';
import { VisualizationComponent } from './layout/visualization/visualization.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TreemapComponent } from './visualizations/treemap/treemap.component';
import { ColombiaMapComponent } from './visualizations/colombia-map/colombia-map.component';
import { RadioFilterComponent } from './filters/radio-filter/radio-filter.component';

@NgModule({
    declarations: [
        AppComponent,
        TopbarComponent,
        SidebarComponent,
        CheckboxFilterComponent,
        RangeFilterComponent,
        SearchListFilterComponent,
        DropdownFilterComponent,
        ButtonFilterComponent,
        PieChartComponent,
        VisualizationComponent,
        TreemapComponent,
        ColombiaMapComponent,
        RadioFilterComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        ...PrimeModules,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
