import { Component, Input, OnInit } from '@angular/core';
import { shared } from '../shared-options';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

    @Input() config: any = {};

    options: any = {};

    constructor() { }

    ngOnInit(): void {
        this.options = {
            title: {
                text: '',
                left: shared.titlePosition
            },
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
                    type: 'pie',
                    radius: '50%',
                    avoidLabelOverlap: true,
                }
            ]
        };

        this.options.title.text = this.config.title;
        this.options.series[0].data = this.config.data;

        console.log(this.options);
    }

}
