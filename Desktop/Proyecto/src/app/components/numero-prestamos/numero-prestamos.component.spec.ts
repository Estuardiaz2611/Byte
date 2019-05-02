import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroPrestamosComponent } from './numero-prestamos.component';

describe('NumeroPrestamosComponent', () => {
  let component: NumeroPrestamosComponent;
  let fixture: ComponentFixture<NumeroPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumeroPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
