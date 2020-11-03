import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { M0M1, Tag, TagChild } from '../models/api';
import { ApiService } from './api.service';

enum MomentIds { M0 = 1, M1, M5 }

@Injectable({
    providedIn: 'root'
})
export class DataService {

    ready = new Subject<boolean>();
    readyFlags = new Array(6).fill(false);

    survey: any[] = [];
    filteredSurvey = new Subject<any[]>();

    moments: Tag[] = [];
    visualizations: TagChild[] = [];
    faculties: Tag[] = [];
    programs: TagChild[] = [];
    genders: Tag[] = [];
    locations: any[] = [];

    filteredVisualizations = new Subject<TagChild[]>();
    filteredPrograms = new Subject<TagChild[]>();

    private _selectedMoment = 0;
    get selectedMoment(): number { return this._selectedMoment; }
    set selectedMoment(id) { this._selectedMoment = id; this.loadSurvey(id); }

    private _selectedVisualization = 1;
    get selectedVisualization(): number { return this._selectedVisualization; }
    set selectedVisualization(id) { this._selectedVisualization = id; this.filterSurvey(); }

    private _selectedFaculties: number[] = [];
    get selectedFaculties(): number[] { return this._selectedFaculties; }
    set selectedFaculties(ids) { this._selectedFaculties = ids; this.filterSurvey(); }

    private _selectedPrograms: number[] = [];
    get selectedPrograms(): number[] { return this._selectedPrograms; }
    set selectedPrograms(ids) { this._selectedPrograms = ids; this.filterSurvey(); }

    private _selectedGenders: number[] = [];
    get selectedGenders(): number[] { return this._selectedGenders; }
    set selectedGenders(ids) { this._selectedGenders = ids; this.filterSurvey(); }

    constructor(private api: ApiService) {
        this.ready.next(false);
        this.api.general.getMoments.subscribe(res => {
            this.moments = res.map(item => ({name: item.Nombre, id: item.IdMomento}));
            this.init(0);
        });
        this.api.general.getVisualizations.subscribe(res => {
            this.visualizations = res.map(item => ({name: item.Nombre, id: item.IdVisualizacion, parent: item.IdMomento}));
            console.log(res);
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
        if (this.readyFlags.every(f => f)) {
            this.ready.next(true);
        } else {
            return;
        }

    }

    loadSurvey(id: number): void {
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
        });
    }

    filterSurvey(): void {
        if (true /*this.selectedMoment === MomentIds.M0 || this.selectedMoment === MomentIds.M1*/) {
            this.filteredSurvey.next(this.survey.filter((record: any) => {
                if (!this._selectedFaculties.includes(record.IdFacultad)) { return false; }
                if (!this._selectedPrograms.includes(record.IdPrograma)) { return false; }
                if (!this._selectedGenders.includes(record.IdSexo)) { return false; }
                return true;
            }));
        }
    }

}
