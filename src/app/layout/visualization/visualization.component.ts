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
    pieConfigs = [
        1, 2, 3, 4, 5, 6, 7,
        11, 12, 13, 14, 15, 16, 17,
        21, 22, 23, 24, 25, 26, 27, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
    ];
    treemapConfigs = [9, 10, 19, 20];
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
        11: { type: 'pie', column: 'TrabajaActualmente' },
        12: { type: 'pie', column: 'AreaAfin' },
        13: { type: 'bar', column: 'TipoVinculacion' },
        14: { type: 'column', column: 'CondicionLaboral' },
        15: { type: 'pie', column: 'TiempoDedicacionLaboral' },
        16: { type: 'pie', column: 'PromedioIngresos' },
        17: { type: 'pie', column: 'Estrato' },
        18: { type: 'geo', column: 'IdUbicacionResidencia', locations: this.data.locations  },
        19: { type: 'treemap', column: 'Empresa' },
        20: { type: 'treemap', column: 'Cargo' },
        21: { type: 'pie', column: 'TrabajaActualmente' },
        22: { type: 'pie', column: 'AreaAfin' },
        23: { type: 'bar', column: 'TipoVinculacion' },
        24: { type: 'column', column: 'CondicionLaboral' },
        25: { type: 'pie', column: 'TiempoDedicacionLaboral' },
        26: { type: 'pie', column: 'PromedioIngresos' },
        27: { type: 'pie', column: 'Estrato' },
        28: { type: 'geo', column: 'IdUbicacionResidencia', locations: this.data.locations  },
        29: { type: 'pie', column: 'Empresa' },
        30: { type: 'pie', column: 'Cargo' },
        31: { type: 'pie', column: 'PrimerTrabajo' },
        32: { type: 'pie', column: 'DemoraVinculacionLaboral' },
        // 33: { type: 'pie', column: '' },
        34: { type: 'pie', column: 'InnovacionHerramientasTecnologiaApoyo' },
        35: { type: 'pie', column: 'CalidadDocentes' },
        36: { type: 'pie', column: 'Infraestructura' },
        37: { type: 'pie', column: 'OportunidadParticipacionInvestigacion' },
        38: { type: 'pie', column: 'PlanEstudios' },
        39: { type: 'pie', column: 'AporteSocial' },
        40: { type: 'pie', column: 'EficaciaSeguimientoEgresados' },
        41: { type: 'pie', column: 'PertinenciaPrograma' },
        42: { type: 'pie', column: 'MecanismosParticipacionEgresados' },
        43: { type: 'pie', column: 'ProgramaFavoreceProyectoVida' },
        44: { type: 'pie', column: 'CalidadFormacion' },
        45: { type: 'pie', column: 'CoherenciaMisionVision' },
        46: { type: 'pie', column: 'EstudiosExterior' },
        47: { type: 'pie', column: 'ConocimientoBecasExterior' },
        48: { type: 'pie', column: 'TrabajoExterior' },
        49: { type: 'pie', column: 'CargoExterior' },
        50: { type: 'pie', column: 'PaisTrabajo' },
        51: { type: 'pie', column: 'PaisEstudio' },
        // 52: { type: 'pie', column: '' },
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
