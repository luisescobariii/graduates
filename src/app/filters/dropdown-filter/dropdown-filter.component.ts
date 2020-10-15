import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-dropdown-filter',
    templateUrl: './dropdown-filter.component.html',
    styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {

    items: SelectItem[] = [
        { label: 'Cantidad de egresados', value: 0 },
        { label: 'Información laboral', value: 1 },
        { label: 'Información geográfica', value: 2 },
    ];

    selectedItem = null;

    constructor() { }

    ngOnInit(): void {
    }

}
