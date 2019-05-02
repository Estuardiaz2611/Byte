import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroPrestamosAltasComponent } from './numero-prestamos-altas.component';

describe('NumeroPrestamosAltasComponent', () => {
  let component: NumeroPrestamosAltasComponent;
  let fixture: ComponentFixture<NumeroPrestamosAltasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumeroPrestamosAltasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeroPrestamosAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
