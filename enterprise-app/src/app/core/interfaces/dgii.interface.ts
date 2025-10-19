export interface IDGIIRequest {
  rnc: string;
}

export interface IDGIIResponse {
  identification: string;
  companyName: string;
  tradeName: string;
  category: any;
  paymentScheme: string;
  status: string;
  economicActivity: string;
  governmentBranch: string;
}
