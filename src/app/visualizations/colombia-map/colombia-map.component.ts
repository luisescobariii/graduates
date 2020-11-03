import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from '../shared-options';

@Component({
    selector: 'app-colombia-map',
    templateUrl: './colombia-map.component.html',
    styleUrls: ['./colombia-map.component.scss']
})
export class ColombiaMapComponent implements OnInit {

    @Input() config = new Observable<any>();
    localConfig: any = {};

    @Output() sortFunction = new EventEmitter<number>();
    selectedSortOption = 0;
    sortOptions = [
        { value: 0, label: 'Alfabético' },
        { value: 1, label: 'Ascendente' },
        { value: 2, label: 'Descendente' },
    ];

    loading = true;
    options: any = {};

    constructor() {}

    ngOnInit(): void {
        this.config.subscribe(res => {
            this.loading = true;
            this.localConfig = res;
            this.showDepts();
        });
    }

    async showDepts(): Promise<void> {
        const data: any[] = [];
        console.log(this.localConfig.data, this.localConfig.locations);
        for (const record of this.localConfig.data) {
            const location = this.localConfig.locations.find(l => l.IdUbicacion.toString() === record.name);
            if (location) {
                const pos = data.find(l => l.name === location.Estado);
                if (pos) {
                    pos.value += record.value;
                } else {
                    data.push({ name: location.Estado, value: record.value});
                }
            }
        }
        const maxValue = Math.max(...data.map(r => r.value));
        console.log(data);
        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                left: shared.titlePosition
            },
            roam: true,
            grid: shared.grid,
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
            },
            legend: {
                orient: 'vertical',
                left: 10,
            },
            visualMap: {
                min: 0,
                max: maxValue,
                calculable: true,
            },
            series: [
                {
                    name: this.localConfig.title,
                    nameProperty: 'dpt',
                    type: 'map',
                    mapType: 'COL_D',
                    avoidLabelOverlap: true,
                    data,
                }
            ]
        };
        this.loading = false;
    }

    async showMpios(): Promise<void> {
        const data: any[] = [];
        console.log(this.localConfig.data, this.localConfig.locations);
        for (const record of this.localConfig.data) {
            const location = this.localConfig.locations.find(l => l.IdUbicacion.toString() === record.name);
            if (location) {
                data.push({ name: location.Ciudad, value: record.value});
            }
        }
        const maxValue = Math.max(...data.map(r => r.value));
        console.log(data);
        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                left: shared.titlePosition
            },
            roam: true,
            grid: shared.grid,
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
            },
            legend: {
                orient: 'vertical',
                left: 10,
            },
            visualMap: {
                min: 0,
                max: maxValue,
                calculable: true,
            },
            series: [
                {
                    name: this.localConfig.title,
                    type: 'map',
                    mapType: 'COL_M',
                    avoidLabelOverlap: true,
                    data,
                }
            ]
        };
        this.loading = false;
    }

}
