import { Component } from '@angular/core';


import { NewUser, Usersrvsupabase } from '../../services/usersrvsupabase'  ;

export interface User {
  id: number;  
  name: string;
  email: string;
  editing?: boolean; // for UI only
}

import { CommonModule } from '@angular/common';     // ngIf
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';


// Add apikey Manually (RAW HTTP – for testing only)
// Use this only if you are calling REST directly (not Supabase JS).
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

// Material UI
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usersupabase',
  standalone: true,
  imports: [
    CommonModule,FormsModule,

    HttpClientModule,

    // Material UI
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule

  ],
  templateUrl: './usersupabase.html',
  styleUrl: './usersupabase.css',
})


export class Usersupabase implements OnInit  {

  // displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  displayedColumns: string[] = [ 'name', 'email', 'actions'];

  // VER1
  // users: any[] = [];

  // VER2 for edit func
  users: User[] = [];


  // VER1
  // newUser: User = { name: '', email: '' };

  // VER2 for edit func
  newUser: NewUser = {
    name: '',
    email: ''
  };

  channel: any;

  
  constructor(
    private usersSrv: Usersrvsupabase,   // ✅ inject here
    private cdr: ChangeDetectorRef
  ) {}

  startEdit(user: User) {
    user.editing = true;

    // backup original values
    (user as any)._backup = { 
        name: user.name, 
        email: user.email 
    };

  }

  cancelEdit(user: User) {
    if ((user as any)._backup) {
        user.name = (user as any)._backup.name;
        user.email = (user as any)._backup.email;
        delete (user as any)._backup;
    }

    user.editing = false;

  }

  async saveEdit(user: User) {
    const updated = await this.usersSrv.updateUser(user);

    Object.assign(user, updated);
    delete (user as any)._backup;
    user.editing = false;
    this.cdr.detectChanges(); // force Angular to update view
  }

  // DONT DELETE:
  // Test API. This working.
  // async ngOnInit() {
  //     this.usersSrv.testApi();
  // }


  // PROD API VER1
  // async ngOnInit() {
  //   // console.log('supabaseUrl: ' + environment.supabaseUrl);
  //   // console.log('supabaseKey: ' + environment.supabaseKey);
  //   console.log('ngOnInit() loaded');
  //   this.users = await this.usersSrv.getUsers();  // ✅ use injected instance
  // }


  // PROD API VER2 - Realtime
  async ngOnInit() {
      try {
        this.users = await this.usersSrv.getUsers();
        console.log('Users loaded:', this.users);
        this.cdr.detectChanges(); // force Angular to update view
      } catch (err) {
        console.error('getUsers failed:', err);
      }

      // Subscribe to realtime changes
      this.channel = this.usersSrv.subscribeRealtime(payload => {

        if (payload.eventType === 'INSERT') {
          this.users = [...this.users, payload.new];
        }

        if (payload.eventType === 'DELETE') {
          this.users = this.users.filter(u => u.id !== payload.old.id);
        }

        if (payload.eventType === 'UPDATE') {
          const i = this.users.findIndex(u => u.id === payload.new.id);
          if (i > -1) this.users[i] = payload.new;
          this.users = [...this.users];
        }
      });



  }

  // Add Func()
  // VER1
  // async add() {
  //   // VER1
  //   // const user = await this.usersSrv.addUser(this.newUser);
  //   // VER2
  //   const created = await this.usersSrv.addUser(this.newUser);

  //   // VER1
  //   // this.users.push(user);                 // ✅ UI updates
  //   // VER2
  //   this.users = [...this.users, created];
  //   this.newUser = { name: '', email: '' };
  //   this.cdr.detectChanges(); // force Angular to update view
  // }

  // VER2
  // async add() {
  //     const created = await this.usersSrv.addUser(this.newUser);
  //     this.users = [...this.users, created];
  //     this.newUser = { name: '', email: '' };
  //     this.cdr.detectChanges(); // force Angular to update view
  // }

  // VER3
  async add(form: any) {
      const created = await this.usersSrv.addUser(this.newUser);

      this.users = [...this.users, created];

      // Reset form state + values
      form.resetForm({ name: '', email: '' });

      this.cdr.detectChanges();
  }


  async save(user: any) {
    const updated = await this.usersSrv.updateUser(user);
    Object.assign(user, updated);
  }

  async delete(id: number) {
    await this.usersSrv.deleteUser(id);
    this.users = this.users.filter(u => u.id !== id);
    this.cdr.detectChanges(); // force Angular to update view
  }

}
