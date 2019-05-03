import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupacionesDeCreditoComponent } from './agrupaciones-de-credito.component';

describe('AgrupacionesDeCreditoComponent', () => {
  let component: AgrupacionesDeCreditoComponent;
  let fixture: ComponentFixture<AgrupacionesDeCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupacionesDeCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupacionesDeCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
