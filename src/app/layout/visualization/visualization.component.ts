import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

enum SortType { Alphabetical, Ascending, Descending }

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

    filteredData: any = [];
    ready = false;
    pieConfigs = [1, 2, 3, 4, 5, 6, 7];
    treemapConfigs = [9, 10];
    geoConfigs = [8, 18, 28];

    cur = 1;
    curConfig = new Subject<any>();
    curSortType = SortType.Alphabetical;

    configs: any = {
        1: { type: 'pie', column: 'TrabajaActualmente' },
        2: { type: 'pie', column: 'AreaAfin' },
        3: { type: 'bar', column: 'TipoVinculacion' },
        4: { type: 'column', column: 'CondicionLaboral' },
        5: { type: 'pie', column: 'TiempoDedicacionLaboral' },
        6: { type: 'pie', column: 'PromedioIngresos' },
        7: { type: 'pie', column: 'Estrato' },
        8: { type: 'geo', column: 'IdUbicacionResidencia', locations: this.data.locations },
        9: { type: 'treemap', column: 'Empresa' },
        10: { type: 'treemap', column: 'Cargo' },
        18: { type: 'geo', column: 'IdUbicacionResidencia' },
        28: { type: 'geo', column: 'IdUbicacionResidencia' },
    };

    constructor(private data: DataService, private route: ActivatedRoute) {}

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
            this.data.selectedVisualization = id;
        });

        this.data.filteredSurvey.subscribe(res => {
            this.filteredData = res;
            this.updateConfig();
        });
    }

    updateConfig(): void {
        const config = this.configs[this.cur];
        if (!config) { return; }
        console.log('Loading config: ' + this.cur);
        this.ready = false;
        if (true /*this.pieConfigs.includes(this.cur)*/) {
            const counts = {};
            for (const record of this.filteredData) {
                if (counts[record[config.column]]) {
                    counts[record[config.column]]++;
                } else {
                    counts[record[config.column]] = 1;
                }
            }
            if (counts['']) {
                counts['N/A'] = counts[''];
                delete counts[''];
            }
            let data: any = Object.keys(counts).map(key => ({name: key, value: counts[key]}));
            if (this.treemapConfigs.includes(this.cur)) {
                for (const record of data) { record.path = ''; }
                this.curSortType = SortType.Descending;
            }
            if (this.geoConfigs.includes(this.cur)) {
                this.curSortType = SortType.Alphabetical;
                config.locations = this.data.locations;
            }
            if (this.curSortType === SortType.Alphabetical) {
                data = data.sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                });
            } else if (this.curSortType === SortType.Ascending) {
                data = data.sort((a, b) => a.value - b.value);
            } else if (this.curSortType === SortType.Descending) {
                data = data.sort((a, b) => b.value - a.value);
            }
            config.data = data;
        }
        this.curConfig.next(config);
        this.ready = true;
    }

    changeSortType(id: SortType): void {
        this.curSortType = id;
        this.updateConfig();
    }

}
