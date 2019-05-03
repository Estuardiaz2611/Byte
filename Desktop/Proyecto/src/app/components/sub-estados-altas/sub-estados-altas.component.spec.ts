import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEstadosAltasComponent } from './sub-estados-altas.component';

describe('SubEstadosAltasComponent', () => {
  let component: SubEstadosAltasComponent;
  let fixture: ComponentFixture<SubEstadosAltasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEstadosAltasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEstadosAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
