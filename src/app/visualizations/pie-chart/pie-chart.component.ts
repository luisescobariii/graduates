import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from '../shared-options';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input() config = new Observable<any>();
    localConfig: any = {};

    @Output() sortFunction = new EventEmitter<number>();
    @Output() separateFunction = new EventEmitter<number>();

    selectedSortOption = 0;
    sortOptions = [
        { value: 0, label: 'Alfabético' },
        { value: 1, label: 'Ascendente' },
        { value: 2, label: 'Descendente' },
    ];

    selectedSeparateOption = 0;
    separateOptions = [
        { value: 0, label: 'Ninguno' },
        { value: 1, label: 'Facultad' },
        { value: 2, label: 'Programa' },
        { value: 3, label: 'Género' },
    ];

    options: any = {};

    constructor() {}

    ngOnInit(): void {
        this.config.subscribe(res => {
            this.localConfig = res;
            this.updateChart();
        });
    }


    updateChart(type: string = ''): void {
        if (type !== '') { this.localConfig.type = type; }
        switch (this.localConfig.type) {
            case 'pie': this.showPie(); break;
            case 'bar': this.showBar(); break;
            case 'column': this.showColumn(); break;
        }
    }

    async showPie(): Promise<void> {
        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                subtext: 'Total: ' + this.localConfig.totalRecords,
                left: shared.titlePosition
            },
            grid: shared.grid,
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                left: 10,
            },
            series: [
                {
                    name: this.localConfig.title,
                    type: 'pie',
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}',
                    },
                    radius: '50%',
                    avoidLabelOverlap: true,
                    data: this.localConfig.data,
                }
            ]
        };
    }

    async showColumn(): Promise<void> {
        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                subtext: 'Total: ' + this.localConfig.totalRecords,
                left: shared.titlePosition
            },
            grid: shared.grid,
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
            },
            xAxis: {
                type: 'category',
                data: this.localConfig.data.map(r => r.name)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: this.localConfig.title,
                    type: 'bar',
                    data: this.localConfig.data.map(r => r.value),
                    label: {
                        show: true,
                        position: 'top',
                    },
                }
            ]
        };
    }

    async showBar(): Promise<void> {
        const tempData = this.localConfig.data.slice().reverse();
        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                subtext: 'Total: ' + this.localConfig.totalRecords,
                left: shared.titlePosition
            },
            grid: shared.grid,
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: tempData.map(r => r.name)
            },
            series: [
                {
                    name: this.localConfig.title,
                    type: 'bar',
                    data: tempData.map(r => r.value),
                    label: {
                        show: true,
                        position: 'right',
                    },
                }
            ]
        };
    }

    sort(): void { this.sortFunction.emit(this.selectedSortOption); }

    separate(): void { this.separateFunction.emit(this.selectedSeparateOption); }

}
