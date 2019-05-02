import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosCierreComponent } from './pasos-cierre.component';

describe('PasosCierreComponent', () => {
  let component: PasosCierreComponent;
  let fixture: ComponentFixture<PasosCierreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasosCierreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasosCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
