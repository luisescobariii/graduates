import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListFilterComponent } from './search-list-filter.component';

describe('SearchListFilterComponent', () => {
  let component: SearchListFilterComponent;
  let fixture: ComponentFixture<SearchListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
