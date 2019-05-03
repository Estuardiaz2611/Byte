import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDePrestamoComponent } from './tipo-de-prestamo.component';

describe('TipoDePrestamoComponent', () => {
  let component: TipoDePrestamoComponent;
  let fixture: ComponentFixture<TipoDePrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDePrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDePrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
