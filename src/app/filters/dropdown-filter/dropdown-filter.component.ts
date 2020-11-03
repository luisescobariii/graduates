import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dropdown-filter',
    templateUrl: './dropdown-filter.component.html',
    styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {

    @Input() items = new Observable<any[]>();
    options: SelectItem[] = [];

    @Output() selectedItem = new EventEmitter<number>();

    constructor() { }

    ngOnInit(): void {
        console.log(0);
        this.items.subscribe(res => {
            console.log(2);
            console.log(res);
            this.options = res.map(i => ({ label: i.name, value: i.id }));
            this.onChange(this.options[0]);
        });
    }

    onChange(res): void {
        this.selectedItem.emit(res.value);
    }

}
