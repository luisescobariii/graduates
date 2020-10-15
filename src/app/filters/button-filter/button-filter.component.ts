import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-button-filter',
    templateUrl: './button-filter.component.html',
    styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {

    items: SelectItem[] = [
        { label: 'M0', value: 0 },
        { label: 'M1', value: 1 },
        { label: 'M5', value: 2 },
    ];

    selectedItem = null;

    constructor() { }

    ngOnInit(): void {
    }

}
