import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    ready = false;

    constructor(public data: DataService) { }

    ngOnInit(): void {
        this.data.ready.subscribe(dataReady => {
            if (dataReady) {
                this.ready = true;
                this.data.ready.unsubscribe();
            }
        });
    }

}
