import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompanyRequest, ICompanyResponse, ICreateCompany } from '../interfaces/company.interface';
import { IDGIIRequest, IDGIIResponse } from '../interfaces/dgii.interface';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http: HttpClient) { }

  /**
   * Method: list all actives companies
   *  @returns { Observable<ICompanyResponse[]> }
   */
  getCompanies() : Observable<ICompanyResponse[]> {
    return this._http.get<ICompanyResponse[]>(`${baseUrl}/Company`);
  }

  /**
   * Method: Get a company by id
   * @param { number } id
   * @returns { Observable<ICompanyResponse> }
   */
  getCompanyById(id: number) : Observable<ICompanyResponse> {
    return this._http.get<ICompanyResponse>(`${baseUrl}/Company/${id}`);
  }

  /**
   * Method: Create a new company
   * @param { ICreateCompany } request
   * @returns { Observable<number> }
   */
  createCompany(request: ICreateCompany) : Observable<number> {
    return this._http.post<number>(`${baseUrl}/Company`, request);
  }

  /**
   * Method: Update a company
   * @param { number } id
   * @param { ICompanyRequest } request
   * @returns { Observable<number> }
   */
  updateCompany(id: number, request: ICompanyRequest) : Observable<number> {
    return this._http.put<number>(`${baseUrl}/Company/${id}`, request);
  }

  /**
   * Method: Delete company
   * @param { number } id
   * @returns { Observable<number> }
   */
  deleteCompany(id: number) : Observable<number> {
    return this._http.delete<number>(`${baseUrl}/Company/${id}`);
  }

  /**
   * Method: Find data from dgii
   * @param { IDGIIRequest } request
   * @returns { Observable<IDGIIResponse> }
   */
  getCompanyInformationFromDgii(request: IDGIIRequest) : Observable<IDGIIResponse> {
    return this._http.get<IDGIIResponse>(`${baseUrl}/Company/dgii/${request.rnc}`);
  }
}
