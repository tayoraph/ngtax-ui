import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule
  ],
})
export class LandingComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;
 menuOpen = false;
  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

 

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach(el => observer.observe(el));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Thank you for your message!');
      this.contactForm.reset();
    }
  }
}
