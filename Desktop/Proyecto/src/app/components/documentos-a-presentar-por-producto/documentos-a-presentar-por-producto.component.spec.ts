import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAPresentarPorProductoComponent } from './documentos-a-presentar-por-producto.component';

describe('DocumentosAPresentarPorProductoComponent', () => {
  let component: DocumentosAPresentarPorProductoComponent;
  let fixture: ComponentFixture<DocumentosAPresentarPorProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosAPresentarPorProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosAPresentarPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
