export interface AccountType {
  status: number;
  message: string;
  accessToken: string;
  data: AccountData;
}

export interface AccountData {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  phone: string;
  status: number;
  account_verified: boolean;
}
