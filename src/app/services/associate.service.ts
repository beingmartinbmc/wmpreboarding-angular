import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Associate} from '../entity/associate';
import {catchError, map} from 'rxjs/operators';
import {MonthlyAssociate} from '../entity/monthly-associate';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  private associatesURL = 'api/associates/associate-details.json';
  private associatesMonthlyDataURL = 'api/associates/associate-monthly-details.json';

  constructor(private http: HttpClient) {
  }

  private static getPagedData(data: Associate[], startIndex: number, pageSize: number) {
    return data.splice(startIndex, pageSize);
  }

  private static handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    return throwError(errorMessage);
  }

  public getUnpagedAssociates(): Observable<Associate[]> {
    return this.http.get<Associate[]>(this.associatesURL);
  }

  public getAllAssociates(offset?: number, pageSize?: number, sortField?: string, sortDirection?: string): Observable<Associate[]> {
    return this.http.get<Associate[]>(this.associatesURL).pipe(
      map((response) => {
        return AssociateService.getPagedData(
          this.getSortedData(
            response,
            sortField,
            sortDirection),
          offset, pageSize);
      }),
      catchError(AssociateService.handleError)
    );
  }

  public getOrderCount(): Observable<number> {
    return this.http.get<Associate[]>(this.associatesURL).pipe(
      map((response) => {
        return response.length;
      }),
      catchError(AssociateService.handleError)
    );
  }

  getAssociatesDataByMonth(): Observable<MonthlyAssociate[]> {
    return this.http.get<MonthlyAssociate[]>(this.associatesMonthlyDataURL).pipe(catchError(this.handleError));
  }

  private getSortedData(data: Associate[], active: string, direction: string) {
    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'name':
          return compare(+a.name, +b.name, isAsc);
        case 'hmEmail':
          return compare(+a.hmEmail, +b.hmEmail, isAsc);
        case 'email':
          return compare(+a.email, +b.email, isAsc);
        case 'joiningStatus':
          return compare(+a.joiningStatus, +b.joiningStatus, isAsc);
        case 'joiningDate':
          return compare(+a.joiningDate, +b.joiningDate, isAsc);
        default:
          return 0;
      }
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    return throwError(errorMessage);
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
