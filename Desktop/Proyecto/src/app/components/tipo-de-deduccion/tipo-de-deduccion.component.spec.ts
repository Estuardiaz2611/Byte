import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeDeduccionComponent } from './tipo-de-deduccion.component';

describe('TipoDeDeduccionComponent', () => {
  let component: TipoDeDeduccionComponent;
  let fixture: ComponentFixture<TipoDeDeduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeDeduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeDeduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
