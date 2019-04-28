import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasDeDesembolsoComponent } from './formas-de-desembolso.component';

describe('FormasDeDesembolsoComponent', () => {
  let component: FormasDeDesembolsoComponent;
  let fixture: ComponentFixture<FormasDeDesembolsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormasDeDesembolsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormasDeDesembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
