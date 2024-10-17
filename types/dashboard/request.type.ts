export interface DriverType {
  message: string;
  success: boolean;
  data: RequestData[];
}

export interface RequestData {
  id: number;
  motorBiker: MotorBiker;
  client: Client;
  requestType: string;
  requestedTime: string;
  createdAt: string;
  updatedAt: string;
  originLocation: string;
  destinationLocation: string;
  status: string;
}

export interface Client {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  status: string;
}

export interface MotorBiker {
  id: number;
  motorType: string;
  fname: string;
  lname: string;
  phone: string;
  plateNumber: string;
  numeroChase: string;
  status: string;
}
