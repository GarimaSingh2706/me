import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, ScrollRevealDirective],
  template: `
    <section id="contact" class="section contact">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">07. Contact</span>
          <h2 class="section-title">Let's Work Together</h2>
          <p class="section-subtitle">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
        </div>

        <div class="contact__grid">
          <div class="contact__info" appScrollReveal>
            <h3 class="contact__info-title">Get in Touch</h3>
            <p class="contact__info-text">
              Feel free to reach out through the form or connect with me on any of these platforms.
            </p>

            <div class="contact__socials">
              <a
                *ngFor="let social of socialLinks"
                class="contact__social-link glass-card"
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <app-icon [icon]="social.icon" [size]="22" />
                <span>{{ social.label }}</span>
                <app-icon icon="arrow_right" [size]="16" />
              </a>
            </div>
          </div>

          <form class="contact__form glass-card" [formGroup]="form" (ngSubmit)="onSubmit()" appScrollReveal [revealDelay]="150">
            <div class="contact__field">
              <label class="contact__label" for="name">Name</label>
              <input
                id="name"
                type="text"
                class="contact__input"
                formControlName="name"
                placeholder="Your name"
                [class.error]="invalid('name')"
              />
              <span class="contact__error" *ngIf="invalid('name')">Please enter your name</span>
            </div>

            <div class="contact__field">
              <label class="contact__label" for="email">Email</label>
              <input
                id="email"
                type="email"
                class="contact__input"
                formControlName="email"
                placeholder="you@example.com"
                [class.error]="invalid('email')"
              />
              <span class="contact__error" *ngIf="invalid('email')">Please enter a valid email</span>
            </div>

            <div class="contact__field">
              <label class="contact__label" for="subject">Subject</label>
              <input
                id="subject"
                type="text"
                class="contact__input"
                formControlName="subject"
                placeholder="What's this about?"
                [class.error]="invalid('subject')"
              />
              <span class="contact__error" *ngIf="invalid('subject')">Please enter a subject</span>
            </div>

            <div class="contact__field">
              <label class="contact__label" for="message">Message</label>
              <textarea
                id="message"
                class="contact__input contact__textarea"
                formControlName="message"
                placeholder="Tell me about your project or just say hi..."
                rows="5"
                [class.error]="invalid('message')"
              ></textarea>
              <span class="contact__error" *ngIf="invalid('message')">Please enter a message</span>
            </div>

            <button
              type="submit"
              class="btn btn-primary contact__submit"
              [disabled]="status() === 'sending'"
            >
              <app-icon *ngIf="status() === 'sent'" icon="check" [size]="18" />
              <app-icon *ngIf="status() === 'error'" icon="x" [size]="18" />
              <span *ngIf="status() === 'idle'">Send Message</span>
              <span *ngIf="status() === 'sending'">Sending...</span>
              <span *ngIf="status() === 'sent'">Message Sent ✓</span>
              <span *ngIf="status() === 'error'">Error — Try Again</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private dataService = inject(PortfolioDataService);

  socialLinks = this.dataService.socialLinks;
  status = signal<Status>('idle');

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  invalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.contactService.submit(this.form.value).subscribe({
      next: () => {
        this.status.set('sent');
        this.form.reset();
        setTimeout(() => this.status.set('idle'), 4000);
      },
      error: () => {
        this.status.set('error');
        setTimeout(() => this.status.set('idle'), 3000);
      },
    });
  }
}
