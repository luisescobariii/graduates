import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

    ready = false;
    pieConfigs = [1, 2, 3];

    cur = 1;

    configs: any = {
        1: {
            data: [
                { value: 32, name: 'A' },
                { value: 15, name: 'B' },
                { value: 27, name: 'C' },
            ]
        }
    };

    constructor(private data: DataService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.data.ready.subscribe(_ => {
            for (const vis of this.data.visualizations) {
                if (this.configs[vis.id]) {
                    this.configs[vis.id].title = vis.name;
                }
            }

            this.ready = true;
        });

        this.route.params.subscribe(params => {
            const id = +params.id;
            this.cur = id;
        });
    }

}
