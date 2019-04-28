import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosAdicionalPorProductoComponent } from './parametros-adicional-por-producto.component';

describe('ParametrosAdicionalPorProductoComponent', () => {
  let component: ParametrosAdicionalPorProductoComponent;
  let fixture: ComponentFixture<ParametrosAdicionalPorProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosAdicionalPorProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosAdicionalPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
