import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-screen" [class.fade-out]="!visible">
      <div class="loading-screen__content">
        <div class="loading-screen__logo">
          <span class="loading-screen__bracket">&lt;</span>
          <span class="loading-screen__name">GS</span>
          <span class="loading-screen__bracket">/&gt;</span>
        </div>
        <div class="loading-screen__bar">
          <div class="loading-screen__progress" [style.width.%]="progress"></div>
        </div>
        <div class="loading-screen__percent">{{ progress }}%</div>
        <div class="loading-screen__text mono">{{ statusText }}</div>
      </div>
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0F172A;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    .loading-screen.fade-out {
      opacity: 0;
      visibility: hidden;
    }
    .loading-screen__content {
      text-align: center;
    }
    .loading-screen__logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      justify-content: center;
    }
    .loading-screen__bracket {
      color: #86C4DA;
      animation: pulse 1.5s ease infinite;
    }
    .loading-screen__name {
      color: #F8FAFC;
      animation: glow 2s ease infinite;
    }
    .loading-screen__bar {
      width: 200px;
      height: 3px;
      background: rgba(255,255,255,0.08);
      border-radius: 999px;
      overflow: hidden;
      margin: 0 auto 0.75rem;
    }
    .loading-screen__progress {
      height: 100%;
      background: linear-gradient(90deg, #86C4DA, #5fa8c4);
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .loading-screen__percent {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #64748B;
      margin-bottom: 0.5rem;
    }
    .loading-screen__text {
      font-size: 0.75rem;
      color: #64748B;
      letter-spacing: 0.05em;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes glow {
      0%, 100% { text-shadow: 0 0 0 transparent; }
      50% { text-shadow: 0 0 20px rgba(134,196,218,0.4); }
    }
  `],
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  @Output() finished = new EventEmitter<void>();

  visible = true;
  progress = 0;
  statusText = 'Initializing...';

  private texts = [
    'Initializing...',
    'Loading modules...',
    'Compiling components...',
    'Setting up animations...',
    'Almost ready...',
    'Welcome!',
  ];
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.progress += Math.random() * 18 + 7;
      if (this.progress >= 100) {
        this.progress = 100;
        this.statusText = this.texts[5];
        if (this.intervalId) clearInterval(this.intervalId);
        setTimeout(() => {
          this.visible = false;
          this.finished.emit();
        }, 500);
      } else {
        const idx = Math.min(
          Math.floor((this.progress / 100) * this.texts.length),
          this.texts.length - 1
        );
        this.statusText = this.texts[idx];
      }
    }, 200);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
