import { Injectable } from '@angular/core';

@Injectable()
export class PaginatorService {

  totalItems;
  totalPages;
  pageSize;
  currentPage;
  startPage;
  endPage;
  startIndex;
  endIndex;
  pages;

  constructor() { }


  getPager(totalItems, currentPage = 1, pageSize = 10) {
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = this.numberRange(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  numberRange(start, end) {
    return new Array(end - start).fill(start).map((d, i) => i + start);
  }

}
