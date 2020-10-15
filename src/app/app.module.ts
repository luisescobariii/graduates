import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        ...PrimeModules,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
