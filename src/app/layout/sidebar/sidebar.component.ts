import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    ready = false;
    faculties = new Subject<any[]>();

    constructor(public data: DataService, private router: Router) { }

    ngOnInit(): void {
        this.data.ready.subscribe(_ => {
            this.data.selectedMoment = this.data.moments[0].id;
            this.data.selectedFaculties = this.data.faculties.map(f => f.id);
            this.data.selectedGenders = this.data.genders.map(p => p.id);

            this.ready = true;
            setTimeout(() => {
                this.faculties.next(this.data.faculties);
                this.filterVisualizations(this.data.selectedMoment);
                this.filterPrograms(this.data.selectedFaculties);
            }, 1000);
        });
        this.data.filteredPrograms.subscribe(res => {
            this.data.selectedPrograms = res.map(p => p.id);
        });
    }

    filterVisualizations(selected): void {
        console.log(1);
        this.data.selectedMoment = selected;
        this.data.filteredVisualizations.next(this.data.visualizations.filter(v => this.data.selectedMoment === v.parent));
    }

    filterPrograms(selected): void {
        console.log(selected);
        this.data.selectedFaculties = selected;
        this.data.filteredPrograms.next(this.data.programs.filter(p => this.data.selectedFaculties.includes(p.parent)));
    }

    loadVisualization(id): void {
        this.router.navigate(['/visualization', id]);
    }

}
