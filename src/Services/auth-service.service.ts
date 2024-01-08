import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceServiceUser {

  private baseUrl = 'https://localhost:7223/api/Auth';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }


}
