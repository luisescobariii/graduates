import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Tag, TagChild } from 'src/app/models/api';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    ready = false;

    constructor(public data: DataService, private router: Router) { }

    ngOnInit(): void {
        this.data.ready.subscribe(_ => {
            this.filterFaculties(this.data.faculties.map(f => f.id));
            this.data.selectedPrograms = this.data.programs.map(p => p.id);
            this.data.selectedGenders = this.data.genders.map(p => p.id);

            this.ready = true;
        });
    }

    filterVisualizations(selected): void {
        this.data.selectedMoment = selected;
        this.data.filteredVisualizations = this.data.visualizations.filter(v => this.data.selectedMoment === v.parent);
    }

    filterFaculties(selected): void {
        this.data.selectedFaculties = selected;
        this.data.filteredPrograms = this.data.programs.filter(p => this.data.selectedFaculties.includes(p.parent));
    }

    mapSelectTag(tags: Tag[]): SelectItem[] { return tags.map(tag => ({label: tag.name, value: tag.id})); }
    mapSelectTagChild(tags: TagChild[]): SelectItem[] { return tags.map(tag => ({label: tag.name, value: tag.id})); }

    loadVisualization(id): void {
        this.router.navigate(['/visualization', id]);
    }

}
