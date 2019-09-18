import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioProdFormComponent } from './usuario-prod-form.component';

describe('UsuarioProdFormComponent', () => {
  let component: UsuarioProdFormComponent;
  let fixture: ComponentFixture<UsuarioProdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioProdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioProdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
