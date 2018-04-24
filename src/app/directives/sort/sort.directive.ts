import { SearchFilterSortService } from './../../services/search-sort-filter/search-sort-filter.service';
import { Directive, ElementRef, ViewContainerRef, HostListener, Renderer2, OnInit, EventEmitter } from '@angular/core';
import { TemplateRef, Input, Output, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Directive({
  selector: '[appSort]'
})
export class SortDirective implements OnInit {

  @Input() array;
  @Input() value;
  @Output() setPage = new EventEmitter<boolean>();

  sortedArray;
  arrayDirection = 'up';
  matIcon;

  @HostListener('click', ['$event'])
  click(event) {
    if (this.arrayDirection === 'up') {
      this.sort(true);
      this.addArrow();
    } else {
      this.sort();
      this.addArrow('up');
    }
    this.setPage.emit(true);
  }


  constructor( @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private SFSService: SearchFilterSortService) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.addArrow('up');
    }
  }

  addArrow(value?) {
    let direction;
    if (value) {
      direction = 'arrow_upward';
      this.arrayDirection = 'up';
    } else {
      this.arrayDirection = 'down';
      direction = 'arrow_downward';
    }

    this.matIcon = this.renderer.createElement('mat-icon');
    const iconName = this.renderer.createText(direction);

    this.renderer.addClass(this.matIcon, 'mat-icon');
    this.renderer.addClass(this.matIcon, 'material-icons');

    this.renderer.appendChild(this.matIcon, iconName);
    this.renderer.appendChild(this.el.nativeElement, this.matIcon);
  }

  deleteArrow() {
    this.renderer.removeChild(this.el.nativeElement, this.matIcon);
  }

  sort(reverse?) {
    this.deleteArrow();
    if (reverse) {
      this.sortedArray = this.SFSService.orderBy(this.array, this.value, true);
    } else {
      this.sortedArray = this.SFSService.orderBy(this.array, this.value);
    }
  }

}
