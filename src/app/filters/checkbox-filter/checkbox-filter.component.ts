import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-checkbox-filter',
    templateUrl: './checkbox-filter.component.html',
    styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit {

    items = [
        { id: 0, text: 'Masculino', value: true },
        { id: 1, text: 'Femenino', value: true },
    ];

    selectedItems = [];

    constructor() { }

    ngOnInit(): void {
    }

}
