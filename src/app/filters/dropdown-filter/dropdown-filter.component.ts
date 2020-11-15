import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dropdown-filter',
    templateUrl: './dropdown-filter.component.html',
    styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit, OnChanges {

    @Input() items: any = [];
    @Input() selected = -1;
    options: SelectItem[] = [];
    selectedOption = -1;

    @Output() selectedItem = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            this.options = this.items.map(i => ({ label: i.name, value: i.id }));
        }
        if (changes.selected) {
            this.selectedOption = this.selected;
        }
    }

    onChange(): void {
        this.selectedItem.emit(this.selected);
    }

}
