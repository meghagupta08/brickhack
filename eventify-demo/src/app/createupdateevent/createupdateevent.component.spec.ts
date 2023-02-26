import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateupdateeventComponent } from './createupdateevent.component';

describe('CreateupdateeventComponent', () => {
  let component: CreateupdateeventComponent;
  let fixture: ComponentFixture<CreateupdateeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateupdateeventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateupdateeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
