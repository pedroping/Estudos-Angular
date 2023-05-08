import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ExpandedStatusService } from '../services/expandedStatus.service';
import { ExpandUserService } from '../services/expandUser.service';

@Directive({
  selector: '[bsExpandedRow]',
  exportAs: 'expandedRow',
})
export class ExpandedRowDirective<T> {
  expandedElement!: T | null;
  @Input() tableElement!: T;
  @Input() bsExpandedRow!: number | string;
  @Input() hasMediaIf!: boolean;
  @Input() expandedElementViewMedia!: number;
  @Input() hasChamadoDetail!: boolean;
  @Input() hasOcorrenciaDetail!: boolean;
  @Input() hasEquipamentoDetail!: boolean;

  @HostBinding('style.cursor')
  cursor!: string;
  @HostBinding('class.expanded-row') get expandedRow() {
    if (this.hasMediaIf && window.innerWidth >= +this.bsExpandedRow)
      this.elementRef.nativeElement.style.cursor = 'pointer';

    const isActive =
      this.expandedStatusService.activedExapandedRow.find(
        (element: any) => element === this.tableElement
      ) ?? this.expandedElement === this.tableElement;

    this.changeDetectorRef.detectChanges();

    return !!isActive;
  }
  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    const element = event.target as HTMLElement;

    if (this.hasMediaIf && window.innerWidth >= +this.bsExpandedRow) return;

    const hasOpen = this.expandedStatusService.activedExapandedRow.find(
      (element: any) => element === this.tableElement
    );

    this.expandedElement =
      this.expandedElement === this.tableElement ? null : this.tableElement;

    const User = this.tableElement as T & {
      id: number;
    };
    if (hasOpen) {
      this.expandedStatusService.activedExapandedRow =
        this.expandedStatusService.activedExapandedRow.filter(
          (element: any) => element !== this.tableElement
        );
      this.expandUserService.Users$$.next(
        this.expandUserService.Users$$.value.filter(
          (element) => element.id != User.id
        )
      );

      return;
    }

    this.expandUserService.changeUser(User.id);

    if (!this.expandedElement) return;

    this.expandedStatusService.activedExapandedRow.push(this.expandedElement);
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private expandedStatusService: ExpandedStatusService<T>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly expandUserService: ExpandUserService
  ) {}
}
