import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { registerMap } from 'echarts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    sidebarToggle = new EventEmitter();

    constructor(http: HttpClient) {
        http.get('../assets/geo/COL_DEPTS.json').subscribe(res => {
            registerMap('COL_D', res);
        });
        http.get('../assets/geo/COL_MPIOS.json').subscribe(res => {
            registerMap('COL_M', res);
        });
    }

    ngOnInit(): void { }

    toggleSidebar(): void {
        this.sidebarToggle.emit();
    }
}
