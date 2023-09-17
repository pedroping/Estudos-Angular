import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenedDialogsService {
  overlay?: Overlay;
  viewContainerRef?: ViewContainerRef;
  portal?: TemplatePortal;

  overlayRef: OverlayRef[] = [];
  openedOverlays$ = new BehaviorSubject<
    {
      template: TemplateRef<unknown>;
      id: number;
      lastPosition: { x: number; y: number };
      lastStyles: { width: string; height: string };
    }[]
  >([]);

  constructor() {}

  setCreators(overlay: Overlay, viewContainerRef: ViewContainerRef) {
    this.overlay = overlay;
    this.viewContainerRef = viewContainerRef;
  }

  openOverlay(template: TemplateRef<unknown>, id: number) {
    if (!this.overlay || !this.viewContainerRef) return;

    this.overlayRef[id] = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: false,
    });
    this.portal = new TemplatePortal(template, this.viewContainerRef);
    this.overlayRef[id].attach(this.portal);
    const actualOverlays = this.openedOverlays$.value;
    actualOverlays.push({
      template: template,
      id: id,
      lastPosition: { x: 0, y: 0 },
      lastStyles: { width: 'auto', height: 'auto' },
    });
    this.openedOverlays$.next(actualOverlays);
  }

  setPosition(id: number) {
    const pane = this.overlayRef[id]['_pane'];

    const width = pane.children[0]?.style.width;
    const height = pane.children[0]?.style.height;

    const values = pane.style.transform
      .split('(')[1]
      .split(',')
      .map(
        (item: string) =>
          +item.replace('px', '').replace(')', '').replace(' ', '')
      );
    const openedOverlays = this.openedOverlays$.value;

    openedOverlays[id].lastPosition = {
      x: values[0],
      y: values[1],
    };

    openedOverlays[id].lastStyles = {
      width: width,
      height: height,
    };

    this.openedOverlays$.next(openedOverlays);
  }

  closeOverlay(id: number, minimize: boolean) {
    this.setPosition(id);
    this.overlayRef[id].detach();
    this.overlayRef.splice(id);
    if (!minimize) {
      const splitedOverlays = this.openedOverlays$.value.filter(
        (item) => item.id != id
      );
      this.openedOverlays$.next(splitedOverlays);
    }
  }

  reOpenElement(openedOverlay: { template: TemplateRef<unknown>; id: number }) {
    if (!this.overlay || !this.viewContainerRef) return;
    if (this.overlayRef[openedOverlay.id]) {
      this.closeOverlay(openedOverlay.id, true);
      return;
    }

    this.overlayRef[openedOverlay.id] = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: false,
    });

    this.portal = new TemplatePortal(
      openedOverlay.template,
      this.viewContainerRef
    );
    console.log(this.openedOverlays$.value[0].lastPosition);

    this.overlayRef[openedOverlay.id].attach(this.portal);
  }
}
