import { Directive, Input, OnInit, ElementRef, Renderer2, inject } from '@angular/core';

/**
 * Scroll reveal directive — adds 'in-view' class when element enters viewport.
 * Pair with CSS: opacity:0 + transform → opacity:1 + transform when .in-view
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  @Input() revealDelay = 0;
  @Input() revealClass = 'in-view';

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const native = this.el.nativeElement as HTMLElement;
    this.renderer.setStyle(native, 'transition-delay', `${this.revealDelay}ms`);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(native, this.revealClass);
            this.observer?.unobserve(native);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(native);
  }
}
