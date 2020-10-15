import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-search-list-filter',
    templateUrl: './search-list-filter.component.html',
    styleUrls: ['./search-list-filter.component.scss']
})
export class SearchListFilterComponent implements OnInit {

    @Input() items: SelectItem[] = [];
    selectedItems = [];

    constructor() { }

    ngOnInit(): void {
    }

}
