import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoDeReversaComponent } from './motivo-de-reversa.component';

describe('MotivoDeReversaComponent', () => {
  let component: MotivoDeReversaComponent;
  let fixture: ComponentFixture<MotivoDeReversaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoDeReversaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoDeReversaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
