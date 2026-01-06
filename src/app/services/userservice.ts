import { Injectable } from '@angular/core';

// LOCAL PC,  CRUD for JSON-SERVER
// C:\Repos\Docker\06portfolioapp\src>npx json-server --watch db.json --port 3000

// Userservice
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';


/** User model */
export interface User {
  id?: number;
  name: string;
  email: string;
}


@Injectable({
  providedIn: 'root',
})

export class Userservice {

  // 🔹 Option A: Local JSON (read-only)
   /* 
   * NOTE:
   * assets/users.json is read-only.
   * For real CRUD use:
   * - REST API
   * - json-server
   */

  // private localUrl = 'assets/users.json';

  // 🔹 Option B: json-server (real CRUD)
  // private apiUrl = 'http://localhost:3000/users';

  private apiUrl = `${environment.apiUrlJSON}/users`;  // ✅ Use environment

  constructor(private http: HttpClient) {}

  /* ================= READ ================= */

  /** Load users from API */
  /** READ users from JSON */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


  /* ================= CREATE ================= */
  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }


  /* ================= UPDATE ================= */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${user.id}`,     
      /* 
      Switch PUT → PATCH
      json-server is much safer with PATCH.
      */
       {
        name: user.name,
        email: user.email
       }
    );
  }


  /* ================= DELETE ================= */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
  
}
