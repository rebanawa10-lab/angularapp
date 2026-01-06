import { Component } from '@angular/core';


import { Chart, registerables } from 'chart.js';
// Register all chart components
Chart.register(...registerables);

// Manually trigger change detection. ReFresh web page to push data loading
import { ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';     // ngIf

// FormsModule for <select> </select>
import { FormsModule } from "@angular/forms";   // ngModel, ngValue
import { DataService } from '../../services/data-service';  // *** NEW 



@Component({
  selector: 'app-salesmanyr', 
  imports: [CommonModule, FormsModule],
  templateUrl: './salesmanyr.html',
  styleUrl: './salesmanyr.css',
})


export class Salesmanyr implements AfterViewInit, OnInit {

  rows: any[] = [];  

  ChartInvDlyParaRef: any;  // <— Store chart reference

  isBrowser = false;
  constructor(
     // private chartservice:  Datadynamicchartservice, // *** OLD 
     private apiData: DataService, // *** NEW 
     private cdr: ChangeDetectorRef, 

    @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


   ngOnInit(): void {

       this.apiDataChartList();

   }


   // ts
   async apiDataChartList(){

      const url = this.apiData.getPortfolioSalemanYRURL();
      const response2 = await fetch(url);   

      const res2= await response2.json();
      // this.rows = res2;

      console.log(res2);

      // API returns Chart.js format, transform it:
      this.rows = res2.labels.map((label: string, i: number) => ({
        labels: label,
        data: res2.data[i]
      }));

      this.cdr.detectChanges();


   }

// WORKING:  
// const response2 = await fetch('http://localhost:8080/api/portfolio/summaryyrurl');
  async apiDataChartLine(){
      // if (!this.isBrowser) return;  
      // if (typeof window === 'undefined') return;  

      if (!this.isBrowser || typeof window === 'undefined') return;

      const url = this.apiData.getPortfolioSalemanYRURL();
      const response2 = await fetch(url);   

      const res2= await response2.json();
      const ctx2 = document.getElementById('apiDataChartLine') as HTMLCanvasElement;   
      new Chart(ctx2, {
            type: 'line',
            data: {
              labels: res2.labels,    // Dynamic labels
              datasets: [{
                label: "YTD Sales in Line Chart",
                data: res2.data,      // Dynamic data
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                      x: {
                        reverse: false     // <<< right-to-left
                      }
                    }
            }
      });   
  }

  async apiDataChartBar(){

     if (!this.isBrowser || typeof window === 'undefined') return;

      const url = this.apiData.getPortfolioSalemanYRURL();
      const response2 = await fetch(url);   

      const res2= await response2.json();
      const ctx2 = document.getElementById('apiDataChartBar') as HTMLCanvasElement;   
      new Chart(ctx2, {
            type: 'bar',
            data: {
              labels: res2.labels,    // Dynamic labels
              datasets: [{
                label: "YTD Sales in Bar Chart",
                data: res2.data,      // Dynamic data
                backgroundColor: 'hsla(307, 82%, 57%, 1.00)',   // bar fill
                borderColor: 'hsla(307, 82%, 57%, 1.00)',         // bar border
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                      x: {
                        reverse: false     // <<< right-to-left
                      }
                    }
            }
      });   

  }

  
  async ngAfterViewInit() {  

      // if (!this.isBrowser) return;

      // const Chart = (await import('chart.js/auto')).default;

      // this.apiDataChartLine();

      // this.apiDataChartBar();


      if (!this.isBrowser) return;
      await this.apiDataChartLine();

      await this.apiDataChartBar();


  }

}
