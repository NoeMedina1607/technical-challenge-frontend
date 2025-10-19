import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreation } from './company-creation.component';

describe('CompanyCreation', () => {
  let component: CompanyCreation;
  let fixture: ComponentFixture<CompanyCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
