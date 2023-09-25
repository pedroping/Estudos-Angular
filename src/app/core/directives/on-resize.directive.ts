import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[onResize]'
})
export class OnResizeDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }


  @HostListener('style') onResize(event: Event) {
    console.log("Resize Bosta");

  }

  ngOnInit(): void {
    console.log(this.elementRef);

    const config = { attributes: true, childList: true, subtree: true };
    new MutationObserver((a) => {
      console.log(this.elementRef.nativeElement.style.width, this.elementRef.nativeElement.style.height);
    }).observe(this.elementRef.nativeElement, config);



  }

}
