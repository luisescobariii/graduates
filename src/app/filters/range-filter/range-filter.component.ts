import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-range-filter',
    templateUrl: './range-filter.component.html',
    styleUrls: ['./range-filter.component.scss']
})
export class RangeFilterComponent implements OnInit {

    values = [2016, 2020];

    constructor() { }

    ngOnInit(): void {
    }

}
