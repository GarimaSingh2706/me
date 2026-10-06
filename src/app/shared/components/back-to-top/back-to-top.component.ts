import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button
      class="back-to-top"
      [class.visible]="visible"
      (click)="scrollTop()"
      aria-label="Back to top"
    >
      <div class="back-to-top__ring">
        <svg viewBox="0 0 36 36" class="back-to-top__progress">
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            stroke-width="2"
          />
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke="#86C4DA"
            stroke-width="2"
            stroke-linecap="round"
            [style.strokeDasharray]="circumference"
            [style.strokeDashoffset]="dashOffset"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <app-icon icon="arrow_up" [size]="18" />
      </div>
    </button>
  `,
  styles: [`
    .back-to-top {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 900;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.8);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
      padding: 0;
      border: none;
      background: none;

      &.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
      }

      &:hover .back-to-top__ring {
        box-shadow: 0 0 25px rgba(134, 196, 218, 0.4);
        transform: scale(1.1);
      }
    }
    .back-to-top__ring {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(134, 196, 218, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: var(--accent);
      transition: all 0.3s ease;
    }
    .back-to-top__progress {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    @media (max-width: 600px) {
      .back-to-top { bottom: 1rem; right: 1rem; }
    }
  `],
})
export class BackToTopComponent {
  visible = false;
  circumference = 2 * Math.PI * 16;
  dashOffset = this.circumference;

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.visible = scrollTop > 400;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    this.dashOffset = this.circumference * (1 - progress);
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
