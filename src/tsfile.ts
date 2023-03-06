export interface UserData {
  fname: string;
  mname: string;
  lname: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  created: string;
  modified: string;
  edit?: boolean;
}

export enum Role {
  SuperAdmin = "superadmin",
  Admin = "admin",
  Subscriber = "subscriber",
}
