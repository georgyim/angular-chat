import { Injectable } from '@angular/core';
import { PaginatorHelper } from './paginator-helper';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {

  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10): PaginatorHelper {
    const totalPages: number = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
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
    const startIndex: number = (currentPage - 1) * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages: number[] = this.numberRange(startPage, endPage + 1);
    return new PaginatorHelper(totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages);
  }

  private numberRange(start, end): number[] {
    return new Array(end - start).fill(start).map((d, i) => i + start);
  }
}
