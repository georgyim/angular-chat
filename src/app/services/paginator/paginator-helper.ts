export class PaginatorHelper {

    public totalItems: number;

    public totalPages: number;

    public pageSize: number;

    public currentPage: number;

    public startPage: number;

    public endPage: number;

    public startIndex: number;

    public endIndex: number;

    public pages: number[];

    public constructor(totalItems: number, currentPage: number, pageSize: number, totalPages: number, startPage: number, endPage: number,
        startIndex: number, endIndex: number, pages: number[]) {
          this.totalItems = totalItems;
          this.currentPage = currentPage;
          this.pageSize = pageSize;
          this.totalPages = totalPages;
          this.startPage = startPage;
          this.endPage = endPage;
          this.startIndex = startIndex;
          this.endIndex = endIndex;
          this.pages = pages;
        }
}