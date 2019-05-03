import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenadoraComponent } from './almacenadora.component';

describe('AlmacenadoraComponent', () => {
  let component: AlmacenadoraComponent;
  let fixture: ComponentFixture<AlmacenadoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenadoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
