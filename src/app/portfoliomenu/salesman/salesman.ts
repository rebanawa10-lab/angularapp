import { Component } from '@angular/core';

import { OnInit, OnDestroy } from '@angular/core';  

// Data
import { HttpClient } from '@angular/common/http';  
import { DataService } from '../../services/data-service';

// Page refresh
// Manually trigger change detection. ReFresh web page to push data loading
import { ChangeDetectorRef } from '@angular/core';

// Grid setup START
import {
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
  GridApi,  // Print
} from "ag-grid-community";

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import {ClientSideRowModelModule, GridReadyEvent, PaginationModule} from 'ag-grid-community'; 
import {ColDef,ICellRendererParams,ValueGetterParams,} from 'ag-grid-community';
import {
  ClientSideRowModelApiModule,
  // ClientSideRowModelModule,
  // ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  // GridApi,
  GridOptions,
  // GridReadyEvent,
  // ModuleRegistry,
  RowGroupingDisplayType,
  createGrid,
  CsvExportModule,
  ExcelExportParams,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,

  IRowNode,
  RowApiModule,
} from "ag-grid-community";


import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";   // ngModel, ngValue
import { NgModule } from '@angular/core';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular'; 


import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';


ModuleRegistry.registerModules([
    AllCommunityModule
  , PaginationModule
  , ClientSideRowModelModule
  , CsvExportModule
  , TextFilterModule
  , NumberFilterModule
  , RowApiModule
]);


// import { Observable } from 'rxjs';

import { ValueFormatterParams } from 'ag-grid-community';

@Component({
  selector: 'app-salesman',
  imports: [
      AgGridAngular,
      CommonModule, FormsModule, 

      HttpClientModule,
      AgGridModule,

  ],

  templateUrl: './salesman.html',
  styleUrl: './salesman.css',
})
export class Salesman implements OnInit  {

  
  strPage =  '' ; 
  strNoOfRecords = '';
  rowData: any[] = [];
  // ModTitle='';   // Page log

  constructor(
    private api: DataService,       // Data
    private http: HttpClient,       // Data
    
    // private router: Router,         // Page log
    // private func : Funcgen,         // Page log
    // private apiTitle: FuncTitle,    

    private cdr: ChangeDetectorRef, // Page refresh

  ) {}


  ngOnInit(): void {
    //     // this.strPage = this.func.pgCurrentName(this.router.url);  // Page log
    //     // console.log(this.func.pgCurrentStat(this.strPage,'I'))    // Page
    //     // this.ModTitle = this.apiTitle.ModTitle(this.router.url);  // Page log

    this.api.getPortfolioSaleman().subscribe(data => {
    // this.api.getPortfolioSaleman().subscribe(data => {
        if (!Array.isArray(data)) {
            console.error('Expected array but got:', data);
            this.rowData = [];
            return;
        }
          // console.log('API RESPONSE:', data);
          // console.log('Is array?', Array.isArray(data));
          // console.log('Length:', data?.length);

        this.rowData = data;
        this.strNoOfRecords = this.rowData.length.toString();
        this.cdr.detectChanges();
        });
  }


  // Grid
  gridApi!: GridApi;

  defaultExcelExportParams: ExcelExportParams = {
    exportAsExcelTable: true,
  };

   themes = [
    { label: "themeQuartz", theme: themeQuartz },
    { label: "themeBalham", theme: themeBalham },
    { label: "themeMaterial", theme: themeMaterial },
    { label: "themeAlpine", theme: themeAlpine },
  ];

  theme = themeBalham;

  
  // When columnDefs is typed as ColDef[], TypeScript infers params automatically, no error.
  columnDefs: ColDef[] = [
    { headerName: 'ID',     field: 'userid' ,     width: 50, sortable: true, filter: true  },
    { headerName: 'Name',   field: 'username' ,   width: 70, sortable: true, filter: true  },
    { headerName: 'Country Code',     field: 'country' ,     width: 50, sortable: true, filter: true  },
    { headerName: 'Country Remarks',     field: 'countrydesc' ,     width: 50, sortable: true, filter: true  },
    { field: 'hired' }, 
    { headerName: 'Active',     
      field: 'active' ,    
      width: 50, 
      sortable: true, 
      filter: true ,        
          cellRenderer: (params: ICellRendererParams) => {
          return `
            <input type="checkbox" disabled ${params.value == 1 ? 'checked' : ''} />
          `;
          }
    },
    {
      headerName: 'Sales',
      field: 'sales',
      valueFormatter: params =>
        params.value != null
          ? Number(params.value).toFixed(2)
          : ''
    }
  ];


  // Column setup
  defaultColDef: ColDef = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
  };


  gridOptions: GridOptions = {
      columnDefs: this.columnDefs,
      rowData: this.rowData,
      defaultColDef: {
        width: 100,
      },
  };

 

}
