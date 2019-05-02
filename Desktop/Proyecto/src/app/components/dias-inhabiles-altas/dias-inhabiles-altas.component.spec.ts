import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasInhabilesAltasComponent } from './dias-inhabiles-altas.component';

describe('DiasInhabilesAltasComponent', () => {
  let component: DiasInhabilesAltasComponent;
  let fixture: ComponentFixture<DiasInhabilesAltasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiasInhabilesAltasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiasInhabilesAltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
