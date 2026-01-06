import { Component } from '@angular/core';

// User
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { User, Userservice } from '../../services/userservice' ;
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';     // ngIf


import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-usercomponent',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,

    CommonModule,
  ],
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css',
})
export class Usercomponent implements OnInit, OnDestroy {

  private sub!: Subscription;

  constructor(
    private userService: Userservice,

    private cdr: ChangeDetectorRef, 
  ) {}

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  newUser: User = { id: 0, name: '', email: '' };

  // NEW EDIT: Start
  editingId: number | null = null;
  backupUser!: User;

  startEdit(user: User): void {
        this.editingId = user.id!;
        this.backupUser = { ...user }; // clone for cancel

        // What { ...user } Actually Does
        //    Typescript ->  This is the JavaScript spread operator:
        // It means: “Create a new object and copy all properties from user into it”. Equivalent to:
        //    Typescript ->  this.backupUser = Object.assign({}, user);

  }

  // OLD 
        // this.userService.updateUser(user).subscribe(() => {
        //   this.editingId = null;
        //   this.loadUsers(); // refresh from DB
        // });

        // NEW 
         // NEW, This avoids NG0100 because Angular finishes checking before the value changes.
         //   this.cdr.detectChanges(); // force sync


      //    when EDIT SAVE button click error appear.

      //    RuntimeError: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. 
      //    Previous value: 'false'. Current value: 'true'. Expression location: _Usercomponent component

      // <button mat-icon-button color="primary" (click)="startEdit(user)">
      //       <mat-icon>edit</mat-icon>
      // </button>
      
      // <button mat-button color="primary" (click)="saveEdit(user)">Save</button>
      // <button mat-button color="warn" (click)="cancelEdit()">Cancel</button>


      // VER1
        // this.userService.updateUser(user).subscribe({
        //   next: () => {
        //     this.editingId = null;
        //     this.loadUsers(); // reload from db.json

        //      // NEW, This avoids NG0100 because Angular finishes checking before the value changes.
        //     // this.cdr.detectChanges(); // force sync
        //     this.cdr.markForCheck();  // safe

        //   },
        //   error: err => console.error('Update failed', err)
        // });  

  saveEdit(user: User): void {
        if (!user.id) {
          console.error('User ID missing');
          return;
        }
        
        // VER2
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.loadUsers();

            setTimeout(() => this.editingId = null);
       
            // this.cdr.detectChanges();
            // this.loadUsers();
          },
          error: err => console.error('Update failed:', err)
        });
  }

  cancelEdit(): void {
        const index = this.dataSource.data.findIndex(u => u.id === this.backupUser.id);
        if (index > -1) {
          this.dataSource.data[index] = this.backupUser;
          this.dataSource._updateChangeSubscription();
        }
        this.editingId = null;
  }
   // NEW EDIT: End



  ngOnInit() {
      this.sub = this.userService.getUsers().subscribe(data => {
        console.log(data);
      });
      this.loadUsers();
      // this.cdr.detectChanges();
  }

  ngOnDestroy() {
      this.sub?.unsubscribe();
  }

  // addUser() (json-server version)
  addUser(): void {
      if (!this.newUser.name || !this.newUser.email) {
        return; // basic validation
      }

      // 1️ Get the last id
      const users = this.dataSource.data;
      const lastId = users.length ? Math.max(...users.map(u => u.id || 0)) : 0;

      // 2️ Assign new id
      // this.newUser.id = lastId + 1;

      // 3️ Add user
      this.userService.addUser(this.newUser).subscribe({
        // OLD:
        // next: () => {      
        //  this.loadUsers(); // reload table


        // NEW: 
        // createdUser.id is guaranteed to exist
        next: (createdUser) => {
          // Use backend-generated ID
          this.dataSource.data = [...this.dataSource.data, createdUser];
          // this.loadUsers(); // reload table

          // reset form
          // OLD: 
          // this.newUser = { name: '', email: '' };

          // NEW1:
          // 🔧 defer reset to next change detection cycle
          // This avoids NG0100 because Angular finishes checking before the value changes.
          // setTimeout(() => {
          //   this.newUser = { name: '', email: '' };
          // });

          // NEW2:
          this.newUser = { name: '', email: '' };
          this.cdr.detectChanges(); // force sync

        },
        error: (err) => {
          console.error('Add user failed', err);
        }
      });
  }

  // json-server
  loadUsers(): void {
      this.userService.getUsers().subscribe(users => {
        this.dataSource.data = users;
      });
  }

  // UPDATE
  editUser(user: User) {
    user.name += ' (edited)';
    this.dataSource._updateChangeSubscription();
  }

  // DELETE
  // OLD: only deleting from the Angular table (frontend memory), not from db.json
  // deleteUser(id: number) {
  //   console.log('click deleteUser()')
  //   this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
  // }

  // NEW:
  deleteUser(id: number): void {
      console.log('click deleteUser()', id);

      this.userService.deleteUser(id).subscribe({
        next: () => {
          // reload from backend
          // Make sure you reload from API, not local JSON:
          this.loadUsers();
        },
        error: err => {
          console.error('Delete failed', err);
        }
      });
  }

}
