import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  readonly activeSection = signal<string>('home');

  private observer: IntersectionObserver | null = null;

  observe(sections: string[]): void {
    this.observer?.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) this.observer!.observe(el);
    }
  }

  disconnect(): void {
    this.observer?.disconnect();
  }
}
