import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { shared } from '../shared-options';

@Component({
    selector: 'app-colombia-map',
    templateUrl: './colombia-map.component.html',
    styleUrls: ['./colombia-map.component.scss']
})
export class ColombiaMapComponent implements OnInit {

    @Input() config = new Observable<any>();
    localConfig: any = {};

    @Output() sortFunction = new EventEmitter<number>();

    loading = false;
    options: any = {};

    zoom = 1;
    center = null;

    constructor() {}

    ngOnInit(): void {
        setTimeout(_ => { this.loading = true; });
        this.config.subscribe(res => {
            this.loading = true;
            this.localConfig = res;
            this.showDepts();
        });
    }

    async showDepts(): Promise<void> {
        if (!this.localConfig || !this.localConfig.data || this.localConfig.data.length === 0) { return; }
        const data: any[] = [];
        for (const record of this.localConfig.data) {
            if (this.localConfig.locations) {
                const location = this.localConfig.locations.find(l => l.IdUbicacion.toString() === record.name);
                if (location) {
                    const pos = data.find(l => l.name === location.Estado);
                    if (pos) {
                        pos.value += record.value;
                    } else {
                        data.push({ name: location.Estado, value: record.value});
                    }
                }
            }
        }
        const maxValue = Math.max(...data.map(r => r.value));

        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                left: shared.titlePosition
            },
            roam: true,
            scaleLimit: {min: 1, max: 10},
            tooltip: {
                trigger: 'item',
                formatter: (res) => {
                    if (res.data) { return `${res.data.name}: ${res.data.value}`; }
                    return null;
                },
            },
            legend: {
                show: false,
            },
            visualMap: {
                min: 0,
                max: maxValue,
                calculable: true,
                realtime: false,
            },
            series: [
                {
                    label: {
                        show: false,
                    },
                    name: this.localConfig.title,
                    nameProperty: 'dpt',
                    type: 'map',
                    mapType: 'COL_D',
                    data,
                    zoom: this.zoom,
                    center: this.center,
                }
            ]
        };
        this.loading = false;
    }

    async showMpios(): Promise<void> {
        const data: any[] = [];

        for (const record of this.localConfig.data) {
            const location = this.localConfig.locations.find(l => l.IdUbicacion.toString() === record.name);
            if (location) {
                data.push({ name: location.Estado + ' - ' + location.Ciudad, value: record.value});
            }
        }
        const maxValue = Math.max(...data.map(r => r.value));

        this.options = {
            toolbox: shared.toolbox,
            title: {
                text: this.localConfig.title,
                left: shared.titlePosition
            },
            roam: true,
            scaleLimit: {min: 1, max: 10},
            tooltip: {
                trigger: 'item',
                formatter:  (res) => {
                    if (res.data) { return `${res.data.name}: ${res.data.value}`; }
                    return null;
                },
            },
            legend: {
                show: false,
            },
            visualMap: {
                min: 0,
                max: maxValue,
                calculable: true,
                realtime: false,
            },
            series: [
                {
                    label: {
                        show: false,
                    },
                    name: this.localConfig.title,
                    nameProperty: 'code',
                    type: 'map',
                    mapType: 'COL_M',
                    data,
                    zoom: this.zoom,
                    center: this.center,
                }
            ]
        };
        this.loading = false;
    }

    loadChartInstance(instance): void {
        instance.on('geoRoam', e => this.onGeoRoam(e, this));
    }

    onGeoRoam(e, context): void {
        if (context.zoom && e.zoom) {
            context.zoom *= e.zoom;
            context.center = [e.originX, e.originY];
        } else {
            context.center[0] += e.dx;
            context.center[1] += e.dy;
        }
    }

}
