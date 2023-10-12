import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAccountComponent } from './validation-account.component';

describe('ValidationAccountComponent', () => {
  let component: ValidationAccountComponent;
  let fixture: ComponentFixture<ValidationAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
