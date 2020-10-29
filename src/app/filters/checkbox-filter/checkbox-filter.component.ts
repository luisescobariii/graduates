import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-checkbox-filter',
    templateUrl: './checkbox-filter.component.html',
    styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit {

    @Input() items: any[] = [];
    checkboxItems: any[] = [];

    selectedCheckboxItems: any[] = [];
    @Output() selectedItems = new EventEmitter<number[]>();

    constructor() { }

    ngOnInit(): void {
        this.checkboxItems = this.items.map(i => ({ id: i.id, text: i.name, value: true }));
    }

    onChange(): void {
        if (this.selectedCheckboxItems.length === 0) {
            this.selectedItems.emit(this.items.map(i => i.id));
        } else {
            this.selectedItems.emit(this.selectedCheckboxItems.map(i => i.id));
        }
    }

}
