import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  delay: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="particles" aria-hidden="true">
      <div
        *ngFor="let p of particles; trackBy: trackParticle"
        class="particle"
        [style.left.%]="p.x"
        [style.top.%]="p.y"
        [style.width.px]="p.size"
        [style.height.px]="p.size"
        [style.opacity]="p.opacity"
        [style.animationDuration.s]="p.speedX * 10"
        [style.animationDelay.s]="p.delay"
      ></div>
    </div>
    <div class="floating-shapes" aria-hidden="true">
      <div class="shape shape--1"></div>
      <div class="shape shape--2"></div>
      <div class="shape shape--3"></div>
    </div>
  `,
  styles: [`
    .particles {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .particle {
      position: absolute;
      border-radius: 50%;
      background: #86C4DA;
      animation: floatParticle linear infinite;
    }
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.3; }
      100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
    }
    .floating-shapes {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.15;
    }
    .shape--1 {
      width: 400px; height: 400px;
      background: #86C4DA;
      top: -100px; left: -100px;
      animation: drift1 20s ease-in-out infinite;
    }
    .shape--2 {
      width: 300px; height: 300px;
      background: #5fa8c4;
      top: 40%; right: -50px;
      animation: drift2 25s ease-in-out infinite;
    }
    .shape--3 {
      width: 350px; height: 350px;
      background: #86C4DA;
      bottom: -100px; left: 30%;
      animation: drift3 30s ease-in-out infinite;
    }
    @keyframes drift1 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(100px, 50px); }
    }
    @keyframes drift2 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-80px, -60px); }
    }
    @keyframes drift3 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-50px, -80px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .particle, .shape { animation: none; }
    }
  `],
})
export class ParticlesComponent implements OnDestroy {
  particles: Particle[] = [];
  private animId: number | null = null;

  constructor() {
    this.generateParticles();
  }

  private generateParticles(): void {
    const count = window.innerWidth < 768 ? 15 : 30;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: Math.random() * 3 + 2,
      speedY: Math.random() * 3 + 2,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 10,
    }));
  }

  trackParticle(_: number, p: Particle): string {
    return `${p.x}-${p.y}`;
  }

  ngOnDestroy(): void {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
