import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDeAgenciasPorEmpresaComponent } from './seleccion-de-agencias-por-empresa.component';

describe('SeleccionDeAgenciasPorEmpresaComponent', () => {
  let component: SeleccionDeAgenciasPorEmpresaComponent;
  let fixture: ComponentFixture<SeleccionDeAgenciasPorEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionDeAgenciasPorEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionDeAgenciasPorEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
