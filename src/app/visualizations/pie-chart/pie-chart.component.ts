import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
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
    sortOptions: SelectItem[] = [
        { value: 0, label: 'Alfabético' },
        { value: 1, label: 'Ascendente' },
        { value: 2, label: 'Descendente' },
    ];

    selectedSeparateOption = 0;
    separateOptions: SelectItem[] = [
        { value: 0, label: 'Ninguno' },
        { value: 1, label: 'Facultad', disabled: false },
        { value: 2, label: 'Programa', disabled: false },
        { value: 3, label: 'Género' },
    ];
    stack = true;
    disableSeparate = false;
    separateError = false;

    options: any = {};

    constructor(private data: DataService) {}

    ngOnInit(): void {
        this.config.subscribe(res => {
            this.localConfig = res;
            this.disableSeparate = res.disableSeparate ?? false;
            if (this.disableSeparate) { this.selectedSeparateOption = 0; }

            if (this.data.selectedFaculties.length > 5) {
                this.separateOptions[1].disabled = true;
                this.separateOptions[1].title = 'Solo se pueden separar hasta 5 facultades.';

                if (this.selectedSeparateOption === 1) {
                    this.separateError = true;
                    return;
                }
            } else {
                this.separateOptions[1].disabled = false;
                this.separateOptions[1].title = '';
            }
            if (this.data.selectedPrograms.length > 5) {
                this.separateOptions[2].disabled = true;
                this.separateOptions[2].title = 'Solo se pueden separar hasta 5 programas.';

                if (this.selectedSeparateOption === 2) {
                    this.separateError = true;
                    return;
                }
            } else {
                this.separateOptions[2].disabled = false;
                this.separateOptions[2].title = '';
            }
            this.separateError = false;
            this.updateChart();
        });
    }


    updateChart(type: string = ''): void {
        if (type !== '') {
            this.localConfig.type = type;
            if (type === 'pie' && this.selectedSeparateOption !== 0) {
                this.selectedSeparateOption = 0;
                this.separate();
                return;
            }
        }
        if (!this.localConfig.data || this.localConfig.data.length === 0) { return; }
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
            },
            legend: {
                orient: 'vertical',
                top: 'middle',
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
        if (!this.localConfig.data) { return; }
        if (Array.isArray(this.localConfig.data) && this.selectedSeparateOption !== 0) { return; }
        if (!Array.isArray(this.localConfig.data) && this.selectedSeparateOption === 0) { return; }
        let series: any;
        let legend: any;
        let tools: any;
        let seriesNames: any = null;
        if (this.selectedSeparateOption === 0) {
            tools = shared.toolbox;
            legend = this.localConfig.data.map(r => r.name);
            series = [
                {
                    name: this.localConfig.title,
                    type: 'bar',
                    data: this.localConfig.data.map(r => r.value),
                    label: {
                        show: true,
                        position: 'top',
                    },
                }
            ];
        } else {
            tools = shared.toolboxMultiple;
            legend = Object.keys(this.localConfig.data);
            if (!this.localConfig.data[legend[0]]) { return; }
            seriesNames = Object.keys(this.localConfig.data[legend[0]]);
            series = seriesNames.map(sName => ({
                name: sName,
                type: 'bar',
                stack: this.stack ? 'Total' : null,
                label: {
                    show: true,
                    position: this.stack ? 'insideTop' : 'top',
                },
                data: legend.map(vName => this.localConfig.data[vName][sName]),
            }));
        }
        this.options = {
            toolbox: tools,
            title: {
                text: this.localConfig.title,
                subtext: 'Total: ' + this.localConfig.totalRecords,
                left: shared.titlePosition
            },
            grid: shared.grid,
            legend : this.selectedSeparateOption === 0 ? null : { data: seriesNames, top: 'bottom' },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            xAxis: {
                type: 'category',
                data: legend,
            },
            yAxis: {
                type: 'value'
            },
            series,
        };
    }

    async showBar(): Promise<void> {
        if (!this.localConfig.data) { return; }
        if (Array.isArray(this.localConfig.data) && this.selectedSeparateOption !== 0) { return; }
        if (!Array.isArray(this.localConfig.data) && this.selectedSeparateOption === 0) { return; }

        let tempData: any;
        if (this.selectedSeparateOption === 0) {
            tempData = this.localConfig.data.slice().reverse();
        } else {
            tempData = {};
            const reversedKeys = Object.keys(this.localConfig.data).reverse();
            for (const rkey of reversedKeys) {
                tempData[rkey] = this.localConfig.data[rkey];
            }
        }
        if (!tempData) { return; }
        let series: any;
        let legend: any;
        let tools: any;
        let seriesNames: any = null;
        if (this.selectedSeparateOption === 0) {
            tools = shared.toolbox;
            legend = tempData.map(r => r.name);
            series = [
                {
                    name: this.localConfig.title,
                    type: 'bar',
                    data: tempData.map(r => r.value),
                    label: {
                        show: true,
                        position: 'right',
                    },
                }
            ];
        } else {
            tools = shared.toolboxMultiple;
            legend = Object.keys(tempData);
            if (!this.localConfig.data[legend[0]]) { return; }
            seriesNames = Object.keys(tempData[legend[0]]);
            series = seriesNames.map(sName => ({
                name: sName,
                type: 'bar',
                stack: this.stack ? 'Total' : null,
                label: {
                    show: true,
                    position: this.stack ? 'insideRight' : 'right',
                },
                data: legend.map(vName => tempData[vName][sName]),
            }));
        }
        this.options = {
            toolbox: tools,
            title: {
                text: this.localConfig.title,
                subtext: 'Total: ' + this.localConfig.totalRecords,
                left: shared.titlePosition
            },
            grid: shared.grid,
            legend : this.selectedSeparateOption === 0 ? null : { data: seriesNames, top: 'bottom' },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: legend
            },
            series,
        };
    }

    sort(): void { this.sortFunction.emit(this.selectedSortOption); }

    separate(): void { this.separateFunction.emit(this.selectedSeparateOption); }

}
