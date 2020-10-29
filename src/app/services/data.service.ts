import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tag, TagChild } from '../models/api';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    ready = new Subject<boolean>();
    readyFlags = new Array(5).fill(false);

    survey: any[] = [];
    filteredSurvey = new Subject<any[]>();

    moments: Tag[] = [];
    visualizations: TagChild[] = [];
    faculties: Tag[] = [];
    programs: TagChild[] = [];
    genders: Tag[] = [];

    filteredVisualizations: TagChild[] = [];
    filteredPrograms: TagChild[] = [];

    selectedMoment = 0;
    selectedVisualization: number[] = [];
    selectedFaculties: number[] = [];
    selectedPrograms: number[] = [];
    selectedGenders: number[] = [];

    constructor(api: ApiService) {
        this.ready.next(false);
        api.general.getMoments.subscribe(res => {
            this.moments = res.map(item => ({name: item.Nombre, id: item.IdMomento}));
            this.init(0);
        });
        api.general.getVisualizations.subscribe(res => {
            this.visualizations = res.map(item => ({name: item.Nombre, id: item.IdVisualizacion, parent: item.IdMomento}));
            this.init(1);
        });
        api.general.getFaculties.subscribe(res => {
            this.faculties = res.map(item => ({name: item.Nombre, id: item.IdFacultad}));
            this.init(2);
        });
        api.general.getPrograms.subscribe(res => {
            this.programs = res.map(item => ({name: item.Nombre, id: item.IdPrograma, parent: item.IdFacultad}));
            this.init(3);
        });
        api.general.getGenders.subscribe(res => {
            this.genders = res.map(item => ({name: item.Nombre, id: item.IdSexo}));
            this.init(4);
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

}
