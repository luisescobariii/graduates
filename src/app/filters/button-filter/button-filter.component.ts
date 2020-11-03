import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-button-filter',
    templateUrl: './button-filter.component.html',
    styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {

    @Input() items: any[] = [];
    options: SelectItem[] = [];

    @Output() selectedItem = new EventEmitter<number>();

    selected: any;

    constructor() { }

    ngOnInit(): void {
        this.options = this.items.map(i => ({ label: i.name, value: i.id }));
        this.selected = this.options[0].value;
        this.onChange(this.options[0]);
    }

    onChange(res): void {
        this.selectedItem.emit(res.value);
    }
}
