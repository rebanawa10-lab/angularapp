import { Component } from '@angular/core';


// SEO - SEARCH ENGINE OPTIMIZATION
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service';
import { ChangeDetectorRef } from '@angular/core'; // Manually trigger change detection. Fresh web page to push data loading
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


// Open dialog instead of window.open()
import { MatDialog } from '@angular/material/dialog';
import { Salesmandtl } from '../salesmandtl/salesmandtl';

@Component({
  selector: 'app-salesseo',
  // imports: [],
  imports: [FormsModule, MatFormFieldModule, MatInputModule,

   ],
  templateUrl: './salesseo.html',
  styleUrl: './salesseo.css',
})
export class Salesseo {


  gUsername = '';
  gCountry ='';
  postsANY: any[] = []; 

  // Search #2
  // strPage =  '' ; 
  strNoOfRecords = '';
  rowData: any[] = [];

  constructor(
      private apiData: DataService,
      private cdr: ChangeDetectorRef,

      private dialog: MatDialog, // Open dialog instead of window.open()
  )
  {}

  // Ver1 Popup showing the parameter value
  // 'width=600,height=600,top=100,left=200,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no'
  // 'width=600,height=600,top=100,left=200,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no'
  // openPopup(userid: string) {
  //   const url = `/salesmandtl?userid=${userid}&popup=1`;

  //   window.open(
  //     url,
  //     'salesmanPopup',
  //     'width=600,height=600,resizable=no'
  //   );
  // }


  
  // Ver2 Popup hide the parameter value
  // Popup, no URL parameter display
  // Parent window
  // openPopup(userid: string) {
  //   // sessionStorage.setItem('popup_userid', userid);

  //   sessionStorage.setItem('popup_userid', userid);
  //   sessionStorage.setItem('is_popup', '1');

  //   window.open(
  //       '/salesmandtl',
  //       'salesmanPopup',
  //       'width=600,height=600,top=100,left=200,toolbar=no,menubar=no,scrollbars=no,resizable=yes'
  //   );
  // }


  // Ver3 Open dialog instead of window.open()
  openPopup(userid: string) {
        this.dialog.open(Salesmandtl, {
          width: '600px',
          height: '500px',
          disableClose: true,          // prevents click outside to close
          autoFocus: false,
          data: {
            userid,
            popup: true
          }
        });
  }

  onSearch(value: string) {
      console.log("Searching for:", value);
      // call API or filter list here
      this.loadUsersFltrChk();
  }


  loadUsersFltrChk () {
      console.log('USERNAME: ' + this.gUsername + ', COUNTRY:'+ this.gCountry)
      if (this.gUsername.length === 0 && this.gCountry.length === 0 ) {
           this.postsANY = []; 
      }
      else 
      {
          console.log('LIST REC: loadUsersFltr() ')
          this.loadUsersFltr();
      }
  }


  loadUsersFltr(){
        this.apiData.getPortfolioSalemanFltr(this.gUsername, this.gCountry).subscribe(data => {
            if (!Array.isArray(data)) {
                console.error('Expected array but got:', data);
                // this.rowData = [];
                this.postsANY = [];
                return;
            }
            console.log('API RESPONSE:', data);
            console.log('Is array?', Array.isArray(data));
            console.log('Length:', data?.length);

            this.postsANY = data;
            // this.rowData = data;
            // this.strNoOfRecords = this.rowData.length.toString();

            this.strNoOfRecords = this.postsANY.length.toString();

            this.cdr.detectChanges();
        });
  }


}
