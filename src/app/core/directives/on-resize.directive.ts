import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OpenedDialogsService } from '../services/opened-dialogs.service';

@Directive({
  selector: '[onResize]',
})
export class OnResizeDirective implements OnInit {
  @Input() id!: number;
  @Output() setPosition = new EventEmitter<{
    position: { x: number; y: number };
    id: number;
  }>();

  lastWidth = 0;
  lastHeight = 0;
  constructor(
    private elementRef: ElementRef,
    private readonly openedDialogsService: OpenedDialogsService
  ) { }

  ngOnInit(): void {
    console.log(this.elementRef);

    const config = { attributes: true, childList: true, subtree: true };
    new MutationObserver((a) => {
      let newConfig = this.openedDialogsService.openedOverlays$.value[this.id];
      let { x, y } = this.getTransformValues();
      const { width, height } = this.getSize();

      if (width == this.lastWidth && height == this.lastHeight || isNaN(width) || isNaN(height)) return;

      this.lastWidth = width;
      this.lastHeight = height;

      let hasTochange = false;

      const xMultiplier = x > 0 ? 1 : -1;
      const yMultiplier = y > 0 ? 1 : -1;

      newConfig.lastPosition.x = x;
      newConfig.lastPosition.y = y;

      if (Math.abs(x * 2) + width > window.innerWidth + 5) {
        x = ((window.innerWidth - width) / 2) * xMultiplier;
        hasTochange = true;
        if (width > window.innerWidth) {
          x = 0;
          hasTochange = false;
        }
      }

      if (Math.abs(y * 2) + height > window.innerHeight - 60) {
        y = ((window.innerHeight - height) / 2) * yMultiplier;
        hasTochange = true;

        if (height > window.innerHeight - 60) {
          y = -29;
          hasTochange = true;
        }
      }

      console.log(
        'Height',
        height,
        window.innerHeight,
        'Width',
        width,
        window.innerWidth
      );

      if (!hasTochange) return;
      newConfig.lastPosition = { x, y };
      this.setPosition.emit({ position: newConfig.lastPosition, id: this.id });
    }).observe(this.elementRef.nativeElement, config);
  }

  getSize() {
    const width = +this.elementRef.nativeElement.style.width.replace('px', '');
    const height = +this.elementRef.nativeElement.style.height.replace(
      'px',
      ''
    );

    return { width, height };
  }

  getTransformValues() {
    const transform = this.elementRef.nativeElement.parentElement.style
      .transform as string;
    const splitedLabel = transform.split('(')[1].replace(')', '');
    const splitedValues = splitedLabel
      .replace(',', '')
      .split(' ')
      .map((value) => +value.replace(',', '').replace('px', ''));

    return { x: splitedValues[0], y: splitedValues[1] };
  }
}
