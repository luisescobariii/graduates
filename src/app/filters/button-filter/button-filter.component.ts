import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-button-filter',
    templateUrl: './button-filter.component.html',
    styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit, OnChanges {

    @Input() items: any[] = [];
    @Input() selected = -1;
    options: SelectItem[] = [];

    @Output() selectedItem = new EventEmitter<number>();

    current: any;

    constructor() { }

    ngOnInit(): void {
        this.options = this.items.map(i => ({ label: i.name, value: i.id }));
        this.current = this.selected;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selected) { this.current = this.selected; }
    }

    onChange(): void {
        this.selectedItem.emit(this.current);
    }
}
