import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  
  currentYear = new Date().getFullYear()+ ' Copyright.   ';

    ngOnInit(): void { 
      
      console.log('ngOnInit About');   
  }

}
