import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'http://LAPTOP-PAULA';
    options = {};

    general = {
        getFaculties: this.get('/GetFacultades'),
        getPrograms: this.get('/GetProgramas'),
        getMoments: this.get('/GetMomentos'),
        getM0: this.get('/GetM0'),
        getM1: this.get('/GetM1'),
        getM5: this.get('/GetM5'),
        getSites: this.get('/GetSedes'),
        getGenders: this.get('/GetSexo'),
        getLocations: this.get('/GetUbicaciones'),
        getVisualizations: this.get('/GetVisualizaciones'),
    };

    constructor(private http: HttpClient) { }

    get(endpoint: string): Observable<any> {
        return this.http.get(this.apiUrl + endpoint, this.options);
    }
}
