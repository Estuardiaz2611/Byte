import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeTipoDeDocumentoComponent } from './registro-de-tipo-de-documento.component';

describe('RegistroDeTipoDeDocumentoComponent', () => {
  let component: RegistroDeTipoDeDocumentoComponent;
  let fixture: ComponentFixture<RegistroDeTipoDeDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDeTipoDeDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeTipoDeDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
