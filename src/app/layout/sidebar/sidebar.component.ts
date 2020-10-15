import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    faculties = [
        {label: 'Ingeniería', value: 0},
        {label: 'Ciencias Básicas', value: 1},
        {label: 'Educación', value: 2},
        {label: 'Agricultura', value: 3},
    ];

    programs = [
        {label: 'Tecnología en diseño y desarrollo web', value: 0},
        {label: 'Tecnología en electrónica', value: 1},
        {label: 'Tecnología en gestión informática', value: 2},
        {label: 'Tecnología en manejo del agua', value: 3},
        {label: 'Tecnología en producción agricola', value: 4},
        {label: 'Tecnología en sistemas', value: 5},
        {label: 'Tecnología en sistemas de información', value: 6},
    ];

    constructor() { }

    ngOnInit(): void { }

}
