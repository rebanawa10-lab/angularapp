// import { Component } from '@angular/core';

// Sales executive details
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { ChangeDetectorRef } from '@angular/core'; // Manually trigger change detection. Fresh web page to push data loading
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { OnInit } from '@angular/core';  

// Detect popup mode in component
// SOLVE ERROR ON ->  route: ActivatedRoute,
import { ActivatedRoute } from '@angular/router';     
// import { Params } from '@angular/router';
// import { ParamMap } from '@angular/router';

// Browser Title
import { Title } from '@angular/platform-browser';

// Checkbox
import { MatCheckboxModule } from '@angular/material/checkbox';

// Number
import { CommonModule } from '@angular/common';

// Receive data inside dialog
import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// DragDropModule
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-salesmandtl',

  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,

     MatCheckboxModule,     // Checkbox
     CommonModule,          // Number

    // Receive data inside dialog
    MatDialogModule,   // ✅ REQUIRED 
    MatButtonModule,    // ✅ for buttons

    // DragDropModule
    DragDropModule,
    MatDialogModule,

   ],
  templateUrl: './salesmandtl.html',
  styleUrl: './salesmandtl.css',
})
export class Salesmandtl implements OnInit {


  gUserid: string | null = null; // class property
  postsANY: any[] = []; 
  strNoOfRecords = '';
  rowData: any[] = [];

  // Receive data inside dialog
  userid!: string;
  // isPopup = false;

  constructor(
      private apiData: DataService,
      private cdr: ChangeDetectorRef,

      private route: ActivatedRoute,

      private titleService: Title, // Browser Title

      // Receive data inside dialog
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<Salesmandtl>
  )
  {
    // Receive data inside dialog
    // this.userid = data.userid;
    // this.isPopup = data.popup === true;
  }

  close() {
    this.dialogRef.close();
  }


  // Popup, no URL parameter display
  // const userid = sessionStorage.getItem('popup_userid');
  // const isPopup = sessionStorage.getItem('is_popup') === '1';
  // if (isPopup) {
  //   // hide sidenav / header / footer
  //   console.log('ngOnInit() Popup mode');
  // }
  // console.log('ngOnInit() User ID:', userid);

  // this.titleService.setTitle('REBANAWA10 - Sales exec details');  
  // this.isPopup = this.route.snapshot.queryParamMap.get('popup') === 'true';
  
  // const userid = paramMap.get('userid');
  // console.log('ngOnInit() USERID:' + userid);
  // console.log('ngOnInit() gUserid:' + this.gUserid);
  
  ngOnInit(): void { 
        // Popup windows
        // this.route.queryParamMap.subscribe(paramMap => {         
        //     this.gUserid = paramMap.get('userid'); 
        // });

        // ✅ GET USERID FROM DIALOG DATA
        this.gUserid = this.data?.userid;
        console.log('Dialog USERID:', this.gUserid);

        this.loadUsersFltrChk();
  }
    

  loadUsersFltrChk() {
      console.log('loadUsersFltrChk() USERID: ' + this.gUserid )
      // Safe null/empty check
      if (!this.gUserid || this.gUserid.length === 0) {
           this.postsANY = []; 
           return;
      }
      else 
      {
          console.log('LIST REC: loadUsersFltr() ')
          this.loadUsersFltr();
      }
  }


  // console.log('API RESPONSE:', data);
  // console.log('Is array?', Array.isArray(data));
  // console.log('Length:', data?.length);
  loadUsersFltr(){
        // Only call API if gUserid is a non-null string
        if (!this.gUserid) {
          console.warn('gUserid is null, skipping API call');
          this.postsANY = [];
          return;
        }

        this.apiData.getPortfolioSalemanDtl(this.gUserid).subscribe(data => {
            if (!Array.isArray(data)) {
                console.error('Expected array but got:', data);
                this.postsANY = [];
                return;
            }
          
            this.postsANY = data;          
            this.strNoOfRecords = this.postsANY.length.toString();
            this.cdr.detectChanges();
        });
  }

}
