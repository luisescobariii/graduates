import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService, MomentIds } from 'src/app/services/data.service';

enum SortType { Alphabetical, Ascending, Descending }
enum SeparateType { None, Faculty, Program, Gender }

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

    filteredData: any = [];
    firstLoad = true;
    ready = false;
    loading = false;
    pieConfigs = [
        1, 2, 3, 4, 5, 6, 7,
        11, 12, 13, 14, 15, 16, 17,
        21, 22, 23, 24, 25, 26, 27,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
    ];
    treemapConfigs = [9, 10, 19, 20, 29, 30];
    geoConfigs = [8, 18, 28];

    separateColumns = ['', 'IdFacultad', 'IdPrograma', 'IdSexo'];

    cur = 1;
    curConfig = new BehaviorSubject<any>(null);
    curSortType = SortType.Alphabetical;
    curSeparateType = SeparateType.None;

    configs: any = {
        1: { moment: MomentIds.M0, type: 'pie', column: 'TrabajaActualmente' },
        2: { moment: MomentIds.M0, type: 'pie', column: 'AreaAfin' },
        3: { moment: MomentIds.M0, type: 'bar', column: 'TipoVinculacion' },
        4: { moment: MomentIds.M0, type: 'column', column: 'CondicionLaboral' },
        5: { moment: MomentIds.M0, type: 'pie', column: 'TiempoDedicacionLaboral' },
        6: { moment: MomentIds.M0, type: 'pie', column: 'PromedioIngresos' },
        7: { moment: MomentIds.M0, type: 'column', column: 'Estrato' },
        8: { moment: MomentIds.M0, type: 'geo', column: 'IdUbicacionResidencia', locations: this.data.locations },
        9: { moment: MomentIds.M0, type: 'treemap', column: 'Empresa' },
        10: { moment: MomentIds.M0, type: 'treemap', column: 'Cargo' },
        11: { moment: MomentIds.M1, type: 'pie', column: 'TrabajaActualmente' },
        12: { moment: MomentIds.M1, type: 'pie', column: 'AreaAfin' },
        13: { moment: MomentIds.M1, type: 'bar', column: 'TipoVinculacion' },
        14: { moment: MomentIds.M1, type: 'column', column: 'CondicionLaboral' },
        15: { moment: MomentIds.M1, type: 'pie', column: 'TiempoDedicacionLaboral' },
        16: { moment: MomentIds.M1, type: 'pie', column: 'PromedioIngresos' },
        17: { moment: MomentIds.M1, type: 'column', column: 'Estrato' },
        18: { moment: MomentIds.M1, type: 'geo', column: 'IdUbicacionResidencia', locations: this.data.locations  },
        19: { moment: MomentIds.M1, type: 'treemap', column: 'Empresa' },
        20: { moment: MomentIds.M1, type: 'treemap', column: 'Cargo' },
        21: { moment: MomentIds.M5, type: 'pie', column: 'TrabajaActualmente' },
        22: { moment: MomentIds.M5, type: 'pie', column: 'AreaAfin' },
        23: { moment: MomentIds.M5, type: 'bar', column: 'TipoVinculacion' },
        24: { moment: MomentIds.M5, type: 'column', column: 'CondicionLaboral' },
        25: { moment: MomentIds.M5, type: 'pie', column: 'TiempoDedicacionLaboral' },
        26: { moment: MomentIds.M5, type: 'pie', column: 'PromedioIngresos' },
        27: { moment: MomentIds.M5, type: 'column', column: 'Estrato' },
        28: { moment: MomentIds.M5, type: 'geo', column: 'IdUbicacionResidencia', locations: this.data.locations  },
        29: { moment: MomentIds.M5, type: 'treemap', column: 'Empresa' },
        30: { moment: MomentIds.M5, type: 'treemap', column: 'Cargo' },
        31: { moment: MomentIds.M5, type: 'pie', column: 'PrimerTrabajo' },
        32: { moment: MomentIds.M5, type: 'pie', column: 'DemoraVinculacionLaboral' },
        33: { moment: MomentIds.M5, type: 'pie', column: 'WorksAtTdea' },
        34: { moment: MomentIds.M5, type: 'pie', column: 'InnovacionHerramientasTecnologiaApoyo' },
        35: { moment: MomentIds.M5, type: 'pie', column: 'CalidadDocentes' },
        36: { moment: MomentIds.M5, type: 'pie', column: 'Infraestructura' },
        37: { moment: MomentIds.M5, type: 'pie', column: 'OportunidadParticipacionInvestigacion' },
        38: { moment: MomentIds.M5, type: 'pie', column: 'PlanEstudios' },
        39: { moment: MomentIds.M5, type: 'pie', column: 'AporteSocial' },
        40: { moment: MomentIds.M5, type: 'pie', column: 'EficaciaSeguimientoEgresados' },
        41: { moment: MomentIds.M5, type: 'pie', column: 'PertinenciaPrograma' },
        42: { moment: MomentIds.M5, type: 'pie', column: 'MecanismosParticipacionEgresados' },
        43: { moment: MomentIds.M5, type: 'pie', column: 'ProgramaFavoreceProyectoVida' },
        44: { moment: MomentIds.M5, type: 'pie', column: 'CalidadFormacion' },
        45: { moment: MomentIds.M5, type: 'pie', column: 'CoherenciaMisionVision' },
        46: { moment: MomentIds.M5, type: 'pie', column: 'EstudiosExterior' },
        47: { moment: MomentIds.M5, type: 'pie', column: 'ConocimientoBecasExterior' },
        48: { moment: MomentIds.M5, type: 'pie', column: 'TrabajoExterior' },
        49: { moment: MomentIds.M5, type: 'pie', column: 'CargoExterior' },
        50: { moment: MomentIds.M5, type: 'pie', column: 'PaisTrabajo' },
        51: { moment: MomentIds.M5, type: 'pie', column: 'PaisEstudio' },
        52: { moment: MomentIds.M5, type: 'pie', column: 'NameFaculty', disableSeparate: true },
    };

    subscription: any = null;

    constructor(private data: DataService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        setTimeout(_ => { this.loading = true; });

        this.route.params.subscribe(params => {
            const id = +params.id;
            this.cur = this.configs[id] ? id : 0;
            if (!this.ready) {
                this.subscription = this.data.ready.subscribe(dataReady => {
                    if (dataReady) {
                        for (const vis of this.data.visualizations) {
                            if (this.configs[vis.id]) { this.configs[vis.id].title = vis.name; }
                        }
                        if (this.cur !== this.data.selectedVisualization) {
                            this.data.selectedVisualization = this.cur;
                        }
                        this.ready = true;
                    }
                });
            } else {
                this.data.selectedVisualization = this.cur;
            }
        });

        this.data.filteredSurvey.subscribe(res => {
            this.filteredData = res;
            this.updateConfig();
        });

        this.data.loading.subscribe(res => { this.loading = res; });

        this.data.init(6);
    }

    updateConfig(): void {
        const config = this.configs[this.cur];

        if (!this.ready || !config) { return; }
        this.ready = false;

        if (this.cur === 33) {
            const tdeaVariants = ['TDEA', 'TECNOLOGICO DE ANTIOQUIA'];
            this.filteredData.forEach(r => {
                r.WorksAtTdea = tdeaVariants.some(v => r.Empresa.includes(v)) ? 'SI' : 'NO';
            });
        }

        if (this.cur === 52) {
            const facNames = {};
            for (const f of this.data.faculties) { facNames[f.id] = f.name; }
            this.filteredData.forEach(r => {
                r.NameFaculty = facNames[r.IdFacultad];
            });
            this.curSeparateType = SeparateType.None;
        }


        if (this.curSeparateType === SeparateType.None /*this.pieConfigs.includes(this.cur)*/) {
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
                this.curSortType = SortType.Alphabetical;
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
        } else {
            const counts = {};
            const countTotals = {};
            let sepMaster: any;
            switch (this.curSeparateType) {
                case SeparateType.Faculty: sepMaster = this.data.faculties.filter(f => this.data.selectedFaculties.includes(f.id)); break;
                case SeparateType.Program: sepMaster = this.data.programs.filter(p => this.data.selectedPrograms.includes(p.id)); break;
                case SeparateType.Gender: sepMaster = this.data.genders; break;
            }
            const sepNames = {};
            for (const col of sepMaster) { sepNames[col.id] = col.name; }
            for (const record of this.filteredData) {
                let value = sepNames[record[this.separateColumns[this.curSeparateType]]];
                if (value === '') { value = 'N/A'; }
                const series = counts[record[config.column]];
                if (series) {
                    if (series[value]) {
                        series[value]++;
                    } else {
                        series[value] = 1;
                    }
                    countTotals[record[config.column]]++;
                } else {
                    const obj = {};
                    for (const key of Object.keys(sepNames).sort(this.alphabeticalSort)) { obj[sepNames[key]] = 0; }
                    obj[value] = 1;
                    counts[record[config.column]] = obj;
                    countTotals[record[config.column]] = 1;
                }
            }

            let sortedKeys: any = [];
            if (this.curSortType === SortType.Alphabetical) {
                sortedKeys = Object.keys(counts).sort(this.alphabeticalSort);
            } else if (this.curSortType === SortType.Ascending) {
                sortedKeys = Object.keys(countTotals).sort((a, b) => {
                    if (countTotals[a] < countTotals[b]) { return -1; }
                    if (countTotals[a] > countTotals[b]) { return 1; }
                    return 0;
                });
            } else if (this.curSortType === SortType.Descending) {
                sortedKeys = Object.keys(countTotals).sort((a, b) => {
                    if (countTotals[a] < countTotals[b]) { return 1; }
                    if (countTotals[a] > countTotals[b]) { return -1; }
                    return 0;
                });
            }

            const data = {};
            for (const key of sortedKeys) { data[key] = counts[key]; }

            config.data = data;
        }
        config.totalRecords = this.filteredData.length;
        this.curConfig.next(config);
        this.ready = true;
    }

    changeSortType(id: SortType): void {
        this.curSortType = id;
        this.updateConfig();
    }

    changeSeparateType(id: SeparateType): void {
        this.curSeparateType = id;
        this.updateConfig();
    }

    alphabeticalSort(a, b): number {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    }

}
