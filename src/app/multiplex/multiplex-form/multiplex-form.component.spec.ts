import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplexFormComponent } from './multiplex-form.component';

describe('MultiplexFormComponent', () => {
  let component: MultiplexFormComponent;
  let fixture: ComponentFixture<MultiplexFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplexFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
