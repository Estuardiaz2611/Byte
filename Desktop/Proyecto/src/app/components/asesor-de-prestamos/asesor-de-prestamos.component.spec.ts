import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorDePrestamosComponent } from './asesor-de-prestamos.component';

describe('AsesorDePrestamosComponent', () => {
  let component: AsesorDePrestamosComponent;
  let fixture: ComponentFixture<AsesorDePrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsesorDePrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorDePrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
