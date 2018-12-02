import { SearchFilterSortService } from './../../services/search-sort-filter/search-sort-filter.service';
import { Directive, ElementRef, ViewContainerRef, HostListener, Renderer2, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';


@Directive({
  selector: '[appSort]'
})
export class SortDirective<T> implements OnInit {

  @Input() array: T[];

  @Input() value: string;

  @Output() setPage = new EventEmitter<boolean>();

  public sortedArray;

  public arrayDirection: string = SortDirection.UP;

  public matIcon: any;

  @HostListener('click', [ '$event' ])
  click(event) {
    if (this.arrayDirection === SortDirection.UP) {
      this.sort(true);
      this.addArrow();
    } else {
      this.sort();
      this.addArrow(SortDirection.UP);
    }
    this.setPage.emit(true);
  }


  public constructor(private el: ElementRef,
                     private viewContainer: ViewContainerRef,
                     private renderer: Renderer2,
                     private SFSService: SearchFilterSortService) {
  }

  public ngOnInit(): void {
    this.addArrow(SortDirection.UP);
  }

  public addArrow(value?: string): void {
    let direction: string;
    if (Boolean(value)) {
      direction = 'arrow_upward';
      this.arrayDirection = SortDirection.UP;
    } else {
      this.arrayDirection = SortDirection.DOWN;
      direction = 'arrow_downward';
    }

    this.matIcon = this.renderer.createElement('mat-icon');
    const iconName = this.renderer.createText(direction);

    this.renderer.addClass(this.matIcon, 'mat-icon');
    this.renderer.addClass(this.matIcon, 'material-icons');

    this.renderer.appendChild(this.matIcon, iconName);
    this.renderer.appendChild(this.el.nativeElement, this.matIcon);
  }

  public deleteArrow(): void {
    this.renderer.removeChild(this.el.nativeElement, this.matIcon);
  }

  public sort(reverse: boolean = false): void {
    this.deleteArrow();
    this.sortedArray = this.SFSService.orderBy(this.array, this.value, reverse);
  }

}

enum SortDirection {

  UP = 'up',

  DOWN = 'down'

}
