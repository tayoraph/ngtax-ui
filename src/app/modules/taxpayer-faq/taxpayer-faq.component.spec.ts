import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerFaqComponent } from './taxpayer-faq.component';

describe('TaxpayerFaqComponent', () => {
  let component: TaxpayerFaqComponent;
  let fixture: ComponentFixture<TaxpayerFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayerFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxpayerFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
