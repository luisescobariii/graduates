import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-radio-filter',
    templateUrl: './radio-filter.component.html',
    styleUrls: ['./radio-filter.component.scss']
})
export class RadioFilterComponent implements OnInit {

    @Input() items: any[] = [];
    options: SelectItem[] = [];

    selectedValue: any;
    @Output() selectedItems = new EventEmitter<number[]>();

    constructor() { }

    ngOnInit(): void {
        this.options = this.items.map(i => ({ value: i.id, label: i.name}));
        this.options.unshift({ value: -1, label: 'Todos' });
        this.selectedValue = this.options[0];
    }

    onChange(): void {
        if (this.selectedValue.value === -1) {
            this.selectedItems.emit(this.items.map(i => i.id));
        } else {
            this.selectedItems.emit([this.selectedValue.value]);
        }
    }

}
