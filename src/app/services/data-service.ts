import { Injectable } from '@angular/core';


//DB HttpClient
import { HttpClient } from '@angular/common/http';  // HttpClient
import { Observable } from 'rxjs';                  // Observable
import { HttpParams } from '@angular/common/http';  // HttpParams
import { environment } from '../../../src/environments/environment';
import { HttpHeaders } from '@angular/common/http';// Post


@Injectable({
  providedIn: 'root',
})
export class DataService {


  constructor(private http: HttpClient) { }

  // Portfolio START
  private apiURLPortfolioSaleman = `${environment.apiUrl}/api/portfolio/salesman`;

  // SEO
  private apiURLPortfolioSalemanFltr = `${environment.apiUrl}/api/portfolio/salesmanfltr`;

  // Salesman detail
  private apiURLPortfolioSalemanDtl = `${environment.apiUrl}/api/portfolio/salesmandtl`;

  // Dashboard
  private apiURLPortfolioSalemanYr = `${environment.apiUrl}/api/portfolio/summaryyr`;
     
  
  private apiURLPortfolioSalemanYrURL = `${environment.apiUrl}/api/portfolio/summaryyrurl`;

  // Portfolio END


  // Portfolio START
  getPortfolioSaleman(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURLPortfolioSaleman);
  }


  // SEO 
  // Salesman list with parameters
  // para1 = username
  // para2 = country
  getPortfolioSalemanFltr(para1: string, para2: any): Observable<any> {
      const params = new HttpParams()
      .set('username', para1)
      .set('country', para2)
      return this.http.get<any>(this.apiURLPortfolioSalemanFltr, { params });
  }


  // Salesman details
  // para1 = userid
  getPortfolioSalemanDtl(para1: string): Observable<any> {
      const params = new HttpParams()
      .set('userid', para1)
      return this.http.get<any>(this.apiURLPortfolioSalemanDtl, { params });
  }


  // Dashboard Chart Line / Bar
  getPortfolioSalemanYR(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURLPortfolioSalemanYr);
  }

  // Dashboard Chart Data
  getPortfolioSalemanYRURL(): string {
    return this.apiURLPortfolioSalemanYrURL.toString();
  }

  // Portfolio End
  
}
