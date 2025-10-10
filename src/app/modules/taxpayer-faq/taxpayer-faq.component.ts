import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-taxpayer-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taxpayer-faq.component.html',
  styleUrls: ['./taxpayer-faq.component.css'],
  animations: [
    trigger('fadeSlide', [
      state('closed', style({
        height: '0px',
        opacity: 0,
        paddingTop: '0',
        paddingBottom: '0',
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        paddingTop: '0.5rem',
        paddingBottom: '1rem',
        overflow: 'hidden'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class TaxpayerFaqComponent {
  activeIndex: number | null = null;

  faqs = [
    { title: 'New Income Tax Brackets', content: 'The reform introduces new tax bands to ensure fairer contributions — higher earners pay slightly more, while low-income workers get relief.' },
    { title: 'Increased Tax-Free Threshold', content: 'The minimum taxable income has been raised to ₦500,000 per year, offering relief for low-income earners.' },
    { title: 'Simplified Tax Filing Process', content: 'Taxpayers can now file online using the new FIRS eTax portal, reducing paperwork and processing time.' },
    { title: 'Small Business Incentives', content: 'SMEs earning below ₦25 million annually now enjoy tax holidays and reduced levies to support growth.' },
    { title: 'Digital Economy Tax', content: 'Online businesses, influencers, and e-commerce platforms will now be taxed under the Digital Services Levy.' },
    { title: 'Property and Luxury Tax', content: 'Owners of high-value properties, yachts, and private jets will face higher taxes under the luxury goods clause.' },
    { title: 'Green Tax Incentives', content: 'Tax credits now apply for businesses adopting renewable energy, recycling, and carbon reduction measures.' },
    { title: 'VAT Adjustments', content: 'VAT remains at 7.5%, but exemptions for basic goods like food and medicines have been expanded.' },
    { title: 'Penalties for Evasion', content: 'Stiffer penalties apply for late filings, false declarations, and non-payment — up to 200% of unpaid tax.' },
    { title: 'Improved Transparency', content: 'FIRS will publish annual tax reports for accountability, detailing collections and national usage.' }
  ];

  toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
