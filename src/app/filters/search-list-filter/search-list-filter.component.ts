import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search-list-filter',
    templateUrl: './search-list-filter.component.html',
    styleUrls: ['./search-list-filter.component.scss']
})
export class SearchListFilterComponent implements OnInit {

    @Input() items = new Observable<any[]>();
    options: SelectItem[] = [];

    @Output() selectedItems = new EventEmitter<number[]>();

    constructor() { }

    ngOnInit(): void {
        this.items.subscribe(res => {
            this.options = res.map(i => ({ label: i.name, value: i.id }));
        });
    }

    onChange(res): void {
        if (res.value.length === 0) {
            this.selectedItems.emit(this.options.map(i => i.value));
        } else {
            this.selectedItems.emit(res.value);
        }
    }

}
