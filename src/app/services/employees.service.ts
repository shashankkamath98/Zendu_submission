import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http:HttpClient
  ) { }

  getAllEmployees():Observable<any>{
    return this.http.get("https://gorest.co.in/public/v2/users")

    // return this.http.get("https://dummyjson.com/users")
  }
}