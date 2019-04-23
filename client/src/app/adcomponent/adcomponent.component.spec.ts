import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcomponentComponent } from './adcomponent.component';

describe('AdcomponentComponent', () => {
  let component: AdcomponentComponent;
  let fixture: ComponentFixture<AdcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
