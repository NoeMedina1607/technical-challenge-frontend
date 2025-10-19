export interface ICompanyRequest {
  name: string;
  tradeName: string;
  category?: string;
  paymentScheme: string;
  status: string;
  economicActivity: string;
  governmentBranch: string;
}

export interface ICreateCompany extends ICompanyRequest {
  identification: string;
}

export interface ICompanyResponse {
  id: number;
  identification: string;
  name: string;
  comercialName: string;
  category: string;
  paymentScheme: string;
  status: string;
  economicActivity: string;
  governmentBranch: string;
  createdAt: string;
  updatedAt: string;
}

