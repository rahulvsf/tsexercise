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
  formatedDate?: string;
}

export enum Role {
  SuperAdmin = "superadmin",
  Admin = "admin",
  Subscriber = "subscriber",
}

function prettifyDate(type: string) {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    console.log(type);
    console.log(target);
    console.log(memberName);
    console.log(propertyDescriptor);
  };
}

export class BeautifyData {
  @prettifyDate("date")
  makeSomeDate() {
    console.log("WOHOO");
  }
}
