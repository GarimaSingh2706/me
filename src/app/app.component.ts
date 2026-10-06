import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { ParticlesComponent } from './shared/components/particles/particles.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    BackToTopComponent,
    ParticlesComponent,
    LoadingScreenComponent,
  ],
  template: `
    <app-loading-screen *ngIf="loading" (finished)="onLoadingFinished()" />

    <app-particles />

    <app-navbar />

    <main class="app-main">
      <router-outlet />
    </main>

    <app-footer />

    <app-back-to-top />
  `,
})
export class App {
  loading = true;

  onLoadingFinished(): void {
    this.loading = false;
  }
}
