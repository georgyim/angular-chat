import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersControlComponent } from './users-control.component';

describe('UsersControlComponent', () => {
  let component: UsersControlComponent;
  let fixture: ComponentFixture<UsersControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
