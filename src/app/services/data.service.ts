import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Tag, TagChild } from '../models/api';
import { ApiService } from './api.service';

export enum MomentIds { M0 = 1, M1, M5 }

@Injectable({
    providedIn: 'root'
})
export class DataService {

    ready = new BehaviorSubject<boolean>(false);
    loading = new BehaviorSubject<boolean>(true);
    readyFlags = new Array(7).fill(false);

    survey: any[] = [];
    filteredSurvey = new BehaviorSubject<any[]>([]);

    moments: Tag[] = [];
    visualizations: TagChild[] = [];
    faculties: Tag[] = [];
    programs: TagChild[] = [];
    genders: Tag[] = [];
    locations: any[] = [];

    filteredVisualizations = new BehaviorSubject<TagChild[]>([]);
    filteredPrograms = new BehaviorSubject<TagChild[]>([]);

    private _selectedMoment = -1;
    get selectedMoment(): number { return this._selectedMoment; }
    set selectedMoment(id) {
        this._selectedMoment = id;
        this.filterVisualizations();
        this.loadSurvey(id);
    }

    private _selectedVisualization = -1;
    get selectedVisualization(): number { return this._selectedVisualization; }
    set selectedVisualization(id) {
        const vis = this.visualizations.find(v => v.id === id);
        if (vis) {
            this._selectedVisualization = id;
            if (vis.parent !== this.selectedMoment) { this.selectedMoment = vis.parent; }
            this.filterSurvey();
        }
    }

    private _selectedFaculties: number[] = [];
    get selectedFaculties(): number[] { return this._selectedFaculties; }
    set selectedFaculties(ids) {
        this._selectedFaculties = ids;
        this.filterPrograms();
        this.filterSurvey();
    }

    private _selectedPrograms: number[] = [];
    get selectedPrograms(): number[] { return this._selectedPrograms; }
    set selectedPrograms(ids) { this._selectedPrograms = ids; this.filterSurvey(); }

    private _selectedGenders: number[] = [];
    get selectedGenders(): number[] { return this._selectedGenders; }
    set selectedGenders(ids) { this._selectedGenders = ids; this.filterSurvey(); }

    constructor(private api: ApiService, private router: Router) {
        this.ready.next(false);
        this.api.general.getMoments.subscribe(res => {
            this.moments = res.map(item => ({name: item.Nombre, id: item.IdMomento}));
            this.init(0);
        });
        this.api.general.getVisualizations.subscribe(res => {
            this.visualizations = res.map(item => ({name: item.Nombre, id: item.IdVisualizacion, parent: item.IdMomento}));
            this.init(1);
        });
        this.api.general.getFaculties.subscribe(res => {
            this.faculties = res.map(item => ({name: item.Nombre, id: item.IdFacultad}));
            this.init(2);
        });
        this.api.general.getPrograms.subscribe(res => {
            this.programs = res.map(item => ({name: item.Nombre, id: item.IdPrograma, parent: item.IdFacultad}));
            this.init(3);
        });
        this.api.general.getGenders.subscribe(res => {
            this.genders = res.map(item => ({name: item.Nombre, id: item.IdSexo}));
            this.init(4);
        });
        this.api.general.getLocations.subscribe(res => {
            this.locations = res;
            this.init(5);
        });
    }

    init(flagIndex: number): void {
        this.readyFlags[flagIndex] = true;
        if (!this.readyFlags.every(f => f)) { return; }

        this.selectedFaculties = this.faculties.map(f => f.id);
        this.selectedPrograms = this.programs.map(p => p.id);
        this.selectedGenders = this.genders.map(p => p.id);

        this.ready.next(true);
    }

    loadSurvey(id: number): void {
        this.loading.next(true);
        let method = '';
        switch (id) {
            case MomentIds.M0: method = 'getM0'; break;
            case MomentIds.M1: method = 'getM1'; break;
            case MomentIds.M5: method = 'getM5'; break;
            default: throw new Error('Invalid Moment Id: ' + id);
        }
        this.api.general[method].subscribe(res => {
            this.survey = res;
            this.filterSurvey();
            this.loading.next(false);
        });
    }

    filterSurvey(): void {
        if (true /*this.selectedMoment === MomentIds.M0 || this.selectedMoment === MomentIds.M1*/) {
            this.filteredSurvey.next(this.survey.filter((record: any) => {
                if (!this.selectedFaculties.includes(record.IdFacultad)) { return false; }
                if (!this.selectedPrograms.includes(record.IdPrograma)) { return false; }
                if (!this.selectedGenders.includes(record.IdSexo)) { return false; }
                return true;
            }));
        }
    }

    private filterVisualizations(): void {
        const filtered = this.visualizations.filter(v => this.selectedMoment === v.parent);
        this.filteredVisualizations.next(filtered);
    }

    private filterPrograms(): void {
        const filtered = this.programs.filter(p => this.selectedFaculties.includes(p.parent));
        this.filteredPrograms.next(filtered);
        this.selectedPrograms = filtered.map(p => p.id);
    }

    changeMoment(id): void {
        this.selectedMoment = id;
        // Set new visualization to the first of selected moment
        let newSelectedVis = 0;
        const filtered = this.visualizations.filter(v => id === v.parent);
        if (filtered?.length > 0) { newSelectedVis = filtered[0].id; }

        // Try to set the same visualization in the new moment
        const curVis = this.visualizations.find(v => v.id === this.selectedVisualization);
        if (curVis) {
            const sameVis = filtered.find(v => v.name === curVis.name);
            if (sameVis) { newSelectedVis = sameVis.id; }
        }
        this.loadVisualization(newSelectedVis);
    }

    loadVisualization(id): void {
        this.router.navigate(['/visualization', id]);
    }

}

/**
 * Mostrar los filtros de lista con todos los chulos y mostrar un mensaje de error cuando no seleccione nada - Done
 * Mostrar títulos sobre las tortas - Done
 * Mostrar total de datos en tortas - Done
 * Bloquar el paso a otros momentos al seleccionar visualizaciones en m5 - Done
 * Dar formato a "ver datos" - Done
 * Mostrar momentos por año - Done
 * Mostrar ayuda explicando cómo funcionan los momentos
 */
