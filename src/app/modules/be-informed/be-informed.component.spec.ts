import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeInformedComponent } from './be-informed.component';

describe('BeInformedComponent', () => {
  let component: BeInformedComponent;
  let fixture: ComponentFixture<BeInformedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeInformedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeInformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
