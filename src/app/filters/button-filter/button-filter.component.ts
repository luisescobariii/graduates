import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-button-filter',
    templateUrl: './button-filter.component.html',
    styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {

    @Input() items: SelectItem[] = [];
    @Output() selectedItem = new EventEmitter<number>();

    selected = null;

    constructor() { }

    ngOnInit(): void {
        this.selected = this.items[0].value;
        this.selectedItem.emit(this.items[0].value);
    }

    onChange(res): void {
        this.selectedItem.emit(res.value);
    }
}
