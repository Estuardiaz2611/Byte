import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontosPorPlazoComponent } from './montos-por-plazo.component';

describe('MontosPorPlazoComponent', () => {
  let component: MontosPorPlazoComponent;
  let fixture: ComponentFixture<MontosPorPlazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontosPorPlazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontosPorPlazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
