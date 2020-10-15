import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    sidebarToggle = new EventEmitter();

    constructor() {}

    ngOnInit(): void { }

    toggleSidebar(): void {
        this.sidebarToggle.emit();
    }
}
