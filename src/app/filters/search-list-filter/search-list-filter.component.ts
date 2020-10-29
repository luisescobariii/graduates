import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-search-list-filter',
    templateUrl: './search-list-filter.component.html',
    styleUrls: ['./search-list-filter.component.scss']
})
export class SearchListFilterComponent implements OnInit {

    @Input() items: SelectItem[] = [];
    @Output() selectedItems = new EventEmitter<number[]>();

    constructor() { }

    ngOnInit(): void {
    }

    onChange(res): void {
        if (res.value.length === 0) {
            this.selectedItems.emit(this.items.map(i => i.value));
        } else {
            this.selectedItems.emit(res.value);
        }
    }

}
