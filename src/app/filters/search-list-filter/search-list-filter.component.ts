import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { observable, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-search-list-filter',
    templateUrl: './search-list-filter.component.html',
    styleUrls: ['./search-list-filter.component.scss']
})
export class SearchListFilterComponent implements OnInit, OnChanges {

    @Input() items: any = [];
    options: SelectItem[] = [];
    selectedOptions: number[] = [];

    @Output() selectedItems = new EventEmitter<number[]>();

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            this.options = this.items.map(i => ({ label: i.name, value: i.id }));
            this.selectedOptions = this.options.map(o => o.value);
        }
    }

    onChange(): void {
        this.selectedItems.emit(this.selectedOptions);
    }


}
