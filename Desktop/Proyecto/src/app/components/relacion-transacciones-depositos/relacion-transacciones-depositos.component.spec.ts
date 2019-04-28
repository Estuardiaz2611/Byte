import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionTransaccionesDepositosComponent } from './relacion-transacciones-depositos.component';

describe('RelacionTransaccionesDepositosComponent', () => {
  let component: RelacionTransaccionesDepositosComponent;
  let fixture: ComponentFixture<RelacionTransaccionesDepositosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionTransaccionesDepositosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionTransaccionesDepositosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
