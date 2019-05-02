import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEstadosComponent } from './sub-estados.component';

describe('SubEstadosComponent', () => {
  let component: SubEstadosComponent;
  let fixture: ComponentFixture<SubEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
