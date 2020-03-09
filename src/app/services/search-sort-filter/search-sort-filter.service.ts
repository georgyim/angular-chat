import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterSortService {

  constructor(private datePipe: DatePipe) {
  }

  public search(array: any[], query: string, excludeProps?: string | string[], dateFormat?: string) {
    // Match query to strings and Date objects / ISO UTC strings
    // Optionally exclude properties from being searched
    // If matching dates, can optionally pass in date format string
    if (!query || !this._objArrayCheck(array)) {
      this._error('There was a problem with your search query, or the provided array could not be searched.');
      return array;
    }

    const lQuery = query.toLowerCase();
    const isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // ISO UTC
    const dateF = dateFormat ? dateFormat : 'medium';
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (!excludeProps || excludeProps.indexOf(key) === -1) {
            const thisVal = item[ key ];
            if (
              // Value is a string and NOT a UTC date
              typeof thisVal === 'string' &&
              !thisVal.match(isoDateRegex) &&
              thisVal.toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            } else if (
              // Value is a Date object or UTC string
              (thisVal instanceof Date || thisVal.toString().match(isoDateRegex)) &&
              // https://angular.io/api/common/DatePipe
              // Matching date format string passed in as param (or default to 'medium')
              this.datePipe.transform(thisVal, dateF).toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
            }
          }
        }
      }
    });
    return filteredArray;
  }

  public filter(array: any[], prop: string, value: any) {
    // Return only items with specific key/value pair
    if (!prop || value === undefined || !this._objArrayCheck(array)) {
      this._error('There was a problem with your filter request, or the provided array could not be filtered.');
      return array;
    }
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === prop && item[ key ] === value) {
            return true;
          }
        }
      }
    });
    return filteredArray;
  }

  public orderBy(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a property
    // Supports string, number, and boolean values

    if (!prop || !this._objArrayCheck(array)) {
      this._error('Property does not exist, or the provided array could not be sorted.');
      return array;
    }
    const propType = typeof array[ 0 ][ prop ];
    let sortedArray;
    switch (propType) {
      case 'string':
        // Default: ascending (A->Z)
        sortedArray = array.sort((a, b) => {
          const itemA = a[ prop ].toLowerCase();
          const itemB = b[ prop ].toLowerCase();
          if (!reverse) {
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
            return 0;
          } else {
            if (itemA > itemB) {
              return -1;
            }
            if (itemA < itemB) {
              return 1;
            }
            return 0;
          }
        });
        break;
      case 'number':
        // Default: ascending (0->9)
        sortedArray = array.sort((a, b) => {
          const itemA = a[ prop ];
          const itemB = b[ prop ];
          return !reverse ? itemA - itemB : itemB - itemA;
        });
        break;
      case 'boolean':
        // Default: descending (true->false)
        sortedArray = array.sort((a, b) => {
          const itemA = a[ prop ];
          const itemB = b[ prop ];
          return !reverse ? itemB - itemA : itemA - itemB;
        });
        break;
      default:
        sortedArray = array;
    }
    return sortedArray;
  }

  public orderByDate(array: any[], prop: string, reverse?: boolean) {
    // Order an array of objects by a date property
    // Default: ascending (1992->2017 | Jan->Dec)
    if (!prop || !this._objArrayCheck(array)) {
      this._error('Property does not exist, or the provided array could not be sorted.');
      return array;
    }
    const sortedArray = array.sort((a, b) => {
      const dateA = new Date(a[ prop ]).getTime();
      const dateB = new Date(b[ prop ]).getTime();
      return !reverse ? dateA - dateB : dateB - dateA;
    });
    return sortedArray;
  }

  private _objArrayCheck(array: any[]): boolean {
    // Checks if all items in array are objects
    // Necessary because some arrays passed in may have
    // models that don't match {[key: string]: any}[]
    // This check prevents uncaught reference errors
    const hasObjs = array.every((item) => !!(item !== null && Object.prototype.toString.call(item) === '[object Object]'));
    const check = hasObjs && array.length > 0;
    if (!check) {
      this._error();
    }
    return check;
  }

  private _error(error?: string) {
    const msg = error ? error : 'Provided array did not contain objects; could not sort/filter.';
    console.warn(`SearchFilterSortService Error: ${msg}`);
  }

}
