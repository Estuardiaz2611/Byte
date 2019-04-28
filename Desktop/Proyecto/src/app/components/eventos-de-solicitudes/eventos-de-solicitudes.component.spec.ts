import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDeSolicitudesComponent } from './eventos-de-solicitudes.component';

describe('EventosDeSolicitudesComponent', () => {
  let component: EventosDeSolicitudesComponent;
  let fixture: ComponentFixture<EventosDeSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosDeSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosDeSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
