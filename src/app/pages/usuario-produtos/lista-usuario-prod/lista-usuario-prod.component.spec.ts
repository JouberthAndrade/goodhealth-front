import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuarioProdComponent } from './lista-usuario-prod.component';

describe('ListaUsuarioProdComponent', () => {
  let component: ListaUsuarioProdComponent;
  let fixture: ComponentFixture<ListaUsuarioProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaUsuarioProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsuarioProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
