import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Associate} from "../entity/associate";
import {HttpClient} from "@angular/common/http";

const url = 'http://localhost:8080/associate'

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor(private http: HttpClient) {
  }

  public getAllAssociates(): Observable<Associate[]> {
    const baseURL = `${url}/all`
    return this.http.get<Associate[]>(baseURL);
  }
}
