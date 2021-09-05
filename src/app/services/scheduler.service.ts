import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../entity/schedule";
import {Invite} from "../entity/invite";

const baseURL = 'http://localhost:8080/scheduler'

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private http: HttpClient) {
  }

  public scheduleInvite(invite: Invite): Observable<Schedule> {
    const url = `${baseURL}/schedule`
    return this.http.post<Schedule>(url, invite);
  }

  public getAllSchedules(): Observable<Schedule[]> {
    const url = `${baseURL}/all`;
    return this.http.get<Schedule[]>(url);
  }

  public deleteSchedule(jobId: string): Observable<any> {
    const url = `${baseURL}/${jobId}`;
    return this.http.delete<any>(url);
  }

  public giveFeedback(connectId: number, feedback: string): Observable<any> {
    const url = `${baseURL}/feedback`
    const request = {
      connectId: connectId,
      feedback: feedback
    }
    return this.http.put<any>(url, request)
  }

}
