import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    items: MenuItem[] = [
        { label: 'Egresados TdeA' },
    ];

    constructor() {
    }

    ngOnInit(): void {
    }


}
