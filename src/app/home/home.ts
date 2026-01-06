import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  ngOnInit(): void {
      console.log('ngOnInit Home');   
  }

}
