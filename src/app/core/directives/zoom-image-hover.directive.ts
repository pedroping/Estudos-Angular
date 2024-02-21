import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, map, merge } from 'rxjs';
import { ZoomImageLensComponent } from 'src/app/Examples/zoom-image/zoom-image-lens/zoom-image-lens.component';

@Directive({
  selector: '[zoomImageHover]',
})
export class ZoomImageHoverDirective implements OnInit {
  imageLens?: ComponentRef<unknown>;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly elementRef: ElementRef
  ) {}

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {
    if (this.imageLens) return;

    this.imageLens = this.vcr.createComponent(ZoomImageLensComponent);
    this.createEvents();
  }

  ngOnInit(): void {}

  createEvents() {
    const lensElement = this.imageLens!.location.nativeElement;
    const imgElement = this.elementRef.nativeElement as HTMLElement;

    const lensMove = fromEvent(lensElement, 'mousemove');
    const lensTouch = fromEvent(lensElement, 'touchmove');
    const imgMove = fromEvent(imgElement, 'mousemove');
    const imgTouch = fromEvent(imgElement, 'touchmove');

    merge(lensMove, lensTouch, imgMove, imgTouch)
      .pipe(map((e) => e as Event))
      .subscribe((event) => {
        event.preventDefault();

        const positions = this.getCursorPos(event as MouseEvent);
        const imgRect = imgElement.getBoundingClientRect();

        const xReduction =
          imgElement.offsetHeight / 2 - lensElement.offsetHeight;
        const yReduction = imgElement.offsetWidth / 2 - lensElement.offsetWidth;

        let x = positions.x - xReduction;
        let y = positions.y - yReduction;

        console.log(x, y, imgElement.getBoundingClientRect());
        console.log(x, imgRect.width * 2);

        if (y < 20) y = Math.max(y, lensElement.offsetHeight / 2);
        if (x > imgRect.width * 2 + lensElement.offsetHeight / 2)
          x = Math.max(x, imgRect.width * 2 + lensElement.offsetHeight / 2);
        // console.log(x, imgElement.offsetWidth * 2);

        // x = Math.min(x, imgElement.offsetWidth * 2);

        lensElement.style.left = x + 'px';
        lensElement.style.top = y + 'px';
      });
  }

  getCursorPos(event: MouseEvent) {
    let x = 0,
      y = 0;
    const imgElement = this.elementRef.nativeElement;
    const imageBounding = imgElement.getBoundingClientRect();

    x = event.pageX;
    y = event.pageY;
    // x = x - window.scrollX;
    // y = y - window.scrollY;
    return { x, y };
  }
}
