import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosCierreAltasComponent } from './pasos-cierre-altas.component';

describe('PasosCierreAltasComponent', () => {
  let component: PasosCierreAltasComponent;
  let fixture: ComponentFixture<PasosCierreAltasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasosCierreAltasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasosCierreAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
