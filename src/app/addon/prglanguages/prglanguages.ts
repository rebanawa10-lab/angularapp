import { Component } from '@angular/core';


// Material UI
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-prglanguages',
  imports: [
    MatTableModule,
     // MatTableDataSource,
  ],
  templateUrl: './prglanguages.html',
  styleUrl: './prglanguages.css',
})
export class Prglanguages {

// dataSource = [
//   { name: 'John', email: 'john@mail.com', role: 'Admin' },
//   { name: 'Jane', email: 'jane@mail.com', role: 'User' }
// ];

// displayedColumns: string[] = ['name', 'email', 'role'];

// dataSource = new MatTableDataSource([
//   { name: 'John', email: 'john@mail.com', role: 'Admin' }
// ]);

displayedColumns = ['name'];

dataSource = [
  { name: 'Angular' },
  { name: 'React' }
];


}
