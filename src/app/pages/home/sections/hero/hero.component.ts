import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="home" class="hero">
      <div class="hero__bg-grid" aria-hidden="true"></div>

      <div class="container hero__container">
        <div class="hero__content">
          <p class="hero__greeting" [@fadeIn]>
            <span class="hero__greeting-line"></span>
            Hello, I'm
          </p>

          <h1 class="hero__name" [@slideIn]>Garima Singh</h1>

          <h2 class="hero__role" [@slideInDelay]>
            <span class="hero__role-text">{{ displayRole }}</span>
            <span class="hero__cursor" [class.blink]="cursorVisible">|</span>
          </h2>

          <p class="hero__tech" [@fadeInDelay]>
            <span class="mono">Java</span> • <span class="mono">Spring Boot</span> •
            <span class="mono">Angular</span> • <span class="mono">PostgreSQL</span>
          </p>

          <p class="hero__desc" [@fadeInDelay2]>{{ heroInfo.description }}</p>

          <div class="hero__actions" [@fadeInDelay3]>
            <button class="btn btn-primary" (click)="scrollToProjects()">
              <span>View My Work</span>
              <app-icon icon="arrow_right" [size]="18" />
            </button>
            <a class="btn btn-secondary" [href]="resumeUrl" download>
              <app-icon icon="download" [size]="18" />
              <span>Download Resume</span>
            </a>
            <button class="btn btn-secondary" (click)="scrollToContact()">
              <app-icon icon="mail" [size]="18" />
              <span>Let's Connect</span>
            </button>
          </div>

          <div class="hero__socials" [@fadeInDelay4]>
            <a
              *ngFor="let social of socialLinks"
              class="hero__social-link"
              [href]="social.url"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="social.label"
            >
              <app-icon [icon]="social.icon" [size]="22" />
            </a>
          </div>
        </div>

        <!-- Terminal Panel -->
        <div class="hero__terminal-wrapper" [@slideInRight]>
          <div class="terminal" (mousemove)="onTerminalMove($event)" (mouseleave)="onTerminalLeave()">
            <div class="terminal__header">
              <div class="terminal__dots">
                <span class="terminal__dot terminal__dot--red"></span>
                <span class="terminal__dot terminal__dot--yellow"></span>
                <span class="terminal__dot terminal__dot--green"></span>
              </div>
              <span class="terminal__title mono">garima@portfolio: ~</span>
            </div>
            <div class="terminal__body" #terminalBody>
              <div class="terminal__line">
                <span class="terminal__prompt">garima@portfolio</span><span class="terminal__sep">:</span><span class="terminal__path">~</span><span class="terminal__dollar">$ </span>
                <span class="terminal__cmd">whoami</span>
              </div>
              <div class="terminal__output">
                <span class="terminal__result">Garima Singh</span>
              </div>
              <div
                *ngFor="let line of typedLines; let i = index"
                class="terminal__line terminal__line--output"
                [style.animationDelay.s]="i * 0.1"
              >
                <span class="terminal__arrow">›</span>
                <span class="terminal__output-text">{{ line }}</span>
              </div>
              <div class="terminal__line">
                <span class="terminal__prompt">garima@portfolio</span><span class="terminal__sep">:</span><span class="terminal__path">~</span><span class="terminal__dollar">$ </span>
                <span class="terminal__cursor blink">_</span>
              </div>
            </div>
          </div>
          <div class="hero__terminal-glow" aria-hidden="true"></div>
        </div>
      </div>

      <div class="hero__scroll-indicator" (click)="scrollToAbout()">
        <span class="hero__scroll-text">Scroll</span>
        <div class="hero__scroll-mouse">
          <div class="hero__scroll-wheel"></div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s 0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.7s 0.35s cubic-bezier(0.16,1,0.3,1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideInDelay', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s 0.55s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInDelay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s 0.7s ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInDelay2', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('0.6s 0.85s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInDelay3', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('0.6s 1s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInDelay4', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.5s 1.15s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('0.8s 0.5s cubic-bezier(0.16,1,0.3,1)', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  private dataService = inject(PortfolioDataService);
  private router = inject(Router);
  private elRef = inject(ElementRef);

  heroInfo = this.dataService.heroInfo;
  socialLinks = this.dataService.socialLinks;
  resumeUrl = this.dataService.resumeUrl;

  displayRole = '';
  cursorVisible = true;
  typedLines: string[] = [];

  private roles = ['Full Stack Developer', 'Java Developer', 'Spring Boot Developer', 'Angular Developer'];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;
  private lineTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.startTypewriter();
    this.startTerminalLines();
  }

  ngOnDestroy(): void {
    this.typeTimer && clearTimeout(this.typeTimer);
    this.lineTimer && clearTimeout(this.lineTimer);
  }

  private startTypewriter(): void {
    const currentRole = this.roles[this.roleIndex];
    if (this.isDeleting) {
      this.displayRole = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.displayRole = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? 50 : 100;
    if (!this.isDeleting && this.charIndex === currentRole.length) {
      delay = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 500;
    }
    this.typeTimer = setTimeout(() => this.startTypewriter(), delay);
  }

  private startTerminalLines(): void {
    const lines = this.heroInfo.terminalLines.slice(1); // skip the name, already shown
    let i = 0;
    const addLine = () => {
      if (i < lines.length) {
        this.typedLines.push(lines[i]);
        i++;
        this.lineTimer = setTimeout(addLine, 400);
      }
    };
    this.lineTimer = setTimeout(addLine, 1200);
  }

  scrollToProjects(): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/'], { fragment: 'projects' }).then(() => {
        setTimeout(() => this.scrollToEl('projects'), 100);
      });
    } else {
      this.scrollToEl('projects');
    }
  }

  scrollToContact(): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
        setTimeout(() => this.scrollToEl('contact'), 100);
      });
    } else {
      this.scrollToEl('contact');
    }
  }

  scrollToAbout(): void {
    this.scrollToEl('about');
  }

  private scrollToEl(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = this.elRef.nativeElement.querySelector('.hero') as HTMLElement;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const grid = hero.querySelector('.hero__bg-grid') as HTMLElement;
    if (grid) {
      grid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
  }

  onTerminalMove(event: MouseEvent): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }

  onTerminalLeave(): void {
    const terminal = this.elRef.nativeElement.querySelector('.terminal') as HTMLElement;
    if (terminal) {
      terminal.style.transform = '';
    }
  }
}
