import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section id="about" class="section about">
      <div class="container">
        <div class="section-header" appScrollReveal>
          <span class="section-label mono">01. About Me</span>
          <h2 class="section-title">Who I Am</h2>
        </div>

        <div class="about__grid">
          <div class="about__text glass-card" appScrollReveal [revealDelay]="100">
            <p>{{ aboutInfo.text }}</p>
            <div class="about__highlights">
              <div class="about__highlight" *ngFor="let h of aboutInfo.highlights">
                <span class="about__highlight-label mono">{{ h.label }}</span>
                <span class="about__highlight-value">{{ h.value }}</span>
              </div>
            </div>
          </div>

          <div class="about__stats" appScrollReveal [revealDelay]="200">
            <div class="about__stat-card glass-card" *ngFor="let stat of aboutInfo.stats; let i = index">
              <div class="about__stat-value">
                <span class="about__stat-number" [attr.data-value]="stat.value" [attr.data-suffix]="stat.suffix">0</span>
                <span class="about__stat-suffix">{{ stat.suffix }}</span>
              </div>
              <div class="about__stat-label">{{ stat.label }}</div>
              <div class="about__stat-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  private dataService = inject(PortfolioDataService);
  aboutInfo = this.dataService.aboutInfo;

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target as HTMLElement);
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5 }
    );
    setTimeout(() => {
      document.querySelectorAll('.about__stat-number').forEach((el) => {
        this.observer?.observe(el);
      });
    }, 500);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCounter(el: HTMLElement): void {
    const target = parseFloat(el.dataset['value'] || '0');
    const suffix = el.dataset['suffix'] || '';
    const duration = 1500;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(2) : Math.floor(value).toString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = isDecimal ? target.toFixed(2) : target.toString() + suffix;
        if (suffix) el.textContent = isDecimal ? target.toFixed(2) : target.toString();
      }
    };
    requestAnimationFrame(tick);
  }
}
