import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Associate} from '../entity/associate';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Invite} from '../entity/invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private invitesURL = 'api/invites/invites.json';

  constructor(private http: HttpClient) {
  }

  private static getPagedData(data: Invite[], startIndex: number, pageSize: number) {
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

  public getOrderCount(): Observable<number> {
    return this.http.get<Associate[]>(this.invitesURL).pipe(
      map((response) => {
        return response.length;
      }),
      catchError(InviteService.handleError)
    );
  }

  public getAllInvites(offset?: number, pageSize?: number, sortField?: string, sortDirection?: string): Observable<Invite[]> {
    return this.http.get<Invite[]>(this.invitesURL).pipe(
      map((response) => {
        return InviteService.getPagedData(
          this.getSortedData(
            response,
            sortField,
            sortDirection),
          offset, pageSize);
      }),
      catchError(InviteService.handleError)
    );
  }

  private getSortedData(data: Invite[], active: string, direction: string) {
    if (!active || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case 'name':
          return compare(+a.name, +b.name, isAsc);
        case 'inviterEmail':
          return compare(+a.inviterEmail, +b.inviterEmail, isAsc);
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
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
