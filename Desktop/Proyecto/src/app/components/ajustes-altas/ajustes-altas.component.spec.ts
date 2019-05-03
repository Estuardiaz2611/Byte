import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesAltasComponent } from './ajustes-altas.component';

describe('AjustesAltasComponent', () => {
  let component: AjustesAltasComponent;
  let fixture: ComponentFixture<AjustesAltasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesAltasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
