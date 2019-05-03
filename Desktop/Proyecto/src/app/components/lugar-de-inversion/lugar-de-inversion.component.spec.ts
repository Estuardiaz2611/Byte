import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarDeInversionComponent } from './lugar-de-inversion.component';

describe('LugarDeInversionComponent', () => {
  let component: LugarDeInversionComponent;
  let fixture: ComponentFixture<LugarDeInversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugarDeInversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarDeInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
