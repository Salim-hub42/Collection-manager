import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginService } from './login-service';

describe('LoginService', () => {
  let component: LoginService;
  let fixture: ComponentFixture<LoginService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
