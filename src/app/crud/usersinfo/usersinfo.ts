import { Component } from '@angular/core';

// LOCAL PC,  CRUD for JSON-SERVER
// C:\Repos\Docker\06portfolioapp\src>npx json-server --watch db.json --port 3000



// User
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { User, Userservice } from '../../services/userservice' ;
import { Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';     // ngIf

import { ChangeDetectorRef } from '@angular/core';

// Signal
import { signal } from '@angular/core';

interface UserRow extends User {
  editing?: boolean;
}


@Component({
  selector: 'app-usersinfo',
  
  imports: [
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,

    CommonModule,
  ],

  templateUrl: './usersinfo.html',
  styleUrl: './usersinfo.css',
})

export class Usersinfo {

  
  // displayedColumns = ['id', 'name', 'email', 'actions'];

  // hide the ID
  displayedColumns = ['name', 'email', 'actions'];

  // Signals
  users = signal<User[]>([]);
  editingId = signal<number | null>(null);
  newUser = signal<User>({ name: '', email: '' });

  private sub!: Subscription;

  constructor(
    private userService: Userservice,

    private cdr: ChangeDetectorRef, 
  ) {this.loadUsers();}

  
  startEdit(user: UserRow) {
      user.editing = true;   
  }


  saveEdit(user: UserRow) {
        this.userService.updateUser(user).subscribe({
          next: () => {           
            // Update the signal for the users array
            this.users.update(users =>
              users.map(u => u.id === user.id ? { ...u, ...user, editing: false } : u)
            );

          }
        });
  }


  cancelEdit(user: UserRow) {
        user.editing = false;
  }


  ngOnInit() {
      this.sub = this.userService.getUsers().subscribe(data => {
        console.log(data);
      });
      this.loadUsers();
  }
  

  ngOnDestroy() {
      this.sub?.unsubscribe();
  }

 
  addUser(): void {     
        const { name, email } = this.newUser();
        if (!name || !email) return;

        this.userService.addUser({ name, email }).subscribe({
            next: (createdUser) => {
              // 🔥 createdUser.id EXISTS here
              console.log('NEW ID:' + createdUser.id);

              this.users.update(users => [...users, createdUser]);

              // reset form
              this.newUser.set({ name: '', email: '' });
            },
            error: err => console.error('Add failed', err)
        });
        
  }

  
  // json-server
  loadUsers(): void {   
      this.userService.getUsers().subscribe({
          next: (data) => this.users.set(data)
      });
  }

 
  // DELETE process start
  // NEW: Signal
  deleteUser(id?: number): void {
        if (!id) return;

        this.userService.deleteUser(id).subscribe({
          next: () => {
              this.users.update(u => u.filter(user => user.id !== id));
              console.log('DEL ID'+ id);          
          },
          error: err => console.error('Delete failed', err)       
        });
  }


  updateNewUserName(value: string): void {
        this.newUser.update(u => ({
          ...u,
          name: value
        }));
  }


  updateNewUserEmail(value: string): void {
        this.newUser.update(u => ({
          ...u,
          email: value
        }));
  }

}
