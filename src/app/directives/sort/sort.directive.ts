import { SearchFilterSortService } from './../../services/search-sort-filter/search-sort-filter.service';
import { Directive, ElementRef, ViewContainerRef, HostListener, Renderer2, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { TemplateRef, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() array;
  @Input() value;

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
  }


  constructor(private el: ElementRef,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private SFSService: SearchFilterSortService) {
  }

  ngOnInit() {
    this.addArrow('up');
  }

  addArrow(value?) {
    let direction;
    if (value) {
      direction = 'arrow_upward';
      this.arrayDirection = 'up';
    } else {
      this.arrayDirection = 'down';
      direction = 'arrow_downward'
    }

    this.matIcon = this.renderer.createElement('mat-icon');
    const iconName = this.renderer.createText(direction);

    this.renderer.addClass(this.matIcon, 'mat-icon');
    this.renderer.addClass(this.matIcon, 'material-icons');

    this.renderer.appendChild(this.matIcon, iconName);
    this.renderer.appendChild(this.el.nativeElement, this.matIcon);
  }

  deleteArrow() {
    this.renderer.removeChild(this.el.nativeElement, this.matIcon)
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
