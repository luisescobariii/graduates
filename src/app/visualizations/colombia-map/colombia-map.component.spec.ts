import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColombiaMapComponent } from './colombia-map.component';

describe('ColombiaMapComponent', () => {
    let component: ColombiaMapComponent;
    let fixture: ComponentFixture<ColombiaMapComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ColombiaMapComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ColombiaMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
