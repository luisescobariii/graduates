import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-dropdown-filter',
    templateUrl: './dropdown-filter.component.html',
    styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {

    @Input() items: SelectItem[] = [];
    @Output() selectedItem = new EventEmitter<number>();

    selected = null;

    constructor() { }

    ngOnInit(): void {
        this.selected = this.items[0].value;
        this.selectedItem.emit(this.items[0].value);
    }

    onChange(res: SelectItem): void {
        this.selectedItem.emit(res.value);
    }

}
