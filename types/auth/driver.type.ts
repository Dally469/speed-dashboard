export interface DriverType {
  message: string;
  success: boolean;
  data: DriverData[];
}

export interface DriverData {
  id: number;
  motorType: string;
  fname: string;
  lname: string;
  phone: string;
  plateNumber: string;
  numeroChase: string;
  status: string;
}
