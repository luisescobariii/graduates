import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from '../shared-options';

@Component({
    selector: 'app-treemap',
    templateUrl: './treemap.component.html',
    styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit {

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

    showNa = true;

    constructor() {}

    ngOnInit(): void {
        this.config.subscribe(res => {
            this.loading = true;
            this.localConfig = res;
            this.showTreemap();
        });
    }

    async showTreemap(): Promise<void> {
        let tempData;
        if (this.showNa) {
            tempData = this.localConfig.data;
        } else {
            tempData = this.localConfig.data.filter(r => r.name !== 'N/A');
        }
        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                left: shared.titlePosition
            },
            grid: shared.grid,
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 10,
            },
            series: [
                {
                    name: this.localConfig.title,
                    type: 'treemap',
                    avoidLabelOverlap: true,
                    data: tempData,
                    visibleMin: 300,
                    levels: [
                        {
                            itemStyle: {
                                borderWidth: 0,
                                gapWidth: 5
                            }
                        },
                        {
                            itemStyle: {
                                gapWidth: 1
                            }
                        },
                        {
                            colorSaturation: [0.35, 0.5],
                            itemStyle: {
                                gapWidth: 1,
                                borderColorSaturation: 0.6
                            }
                        }
                    ]
                }
            ]
        };
        this.loading = false;
    }

    sort(): void {
        this.sortFunction.emit(this.selectedSortOption);
    }

    toggleNa(): void {
        this.showNa = !this.showNa;
        this.showTreemap();
    }

}
