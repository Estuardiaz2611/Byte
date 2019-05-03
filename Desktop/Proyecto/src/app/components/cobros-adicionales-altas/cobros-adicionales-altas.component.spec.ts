import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosAdicionalesAltasComponent } from './cobros-adicionales-altas.component';

describe('CobrosAdicionalesAltasComponent', () => {
  let component: CobrosAdicionalesAltasComponent;
  let fixture: ComponentFixture<CobrosAdicionalesAltasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobrosAdicionalesAltasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrosAdicionalesAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
