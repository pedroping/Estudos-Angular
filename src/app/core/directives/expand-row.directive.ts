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
  selector: '[ExpandedRow]',
  exportAs: 'expandedRow',
})
export class ExpandedRowDirective<T> {
  expandedElement!: T | null;
  @Input() tableElement!: T;
  @Input() ExpandedRow!: number | string;

  @HostBinding('style.cursor')
  cursor!: string;
  @HostBinding('class.expanded-row') get expandedRow() {
    
    this.elementRef.nativeElement.style.cursor = 'pointer';

    const isActive = this.expandedStatusService.activedExapandedRow.find(
      (element: any) => element === this.tableElement
    );

    this.changeDetectorRef.detectChanges();

    return !!isActive;
  }
  @HostListener('click', ['$event']) onClick(event: Event): void {
    const element = event.target as HTMLElement;

    const OnEdit = this.tableElement as T & {
      onEdit: boolean;
    };

    if (['INPUT', 'SPAN'].includes(element.tagName) || OnEdit.onEdit) return;

    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

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
