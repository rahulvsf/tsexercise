import { UserData } from "./tsfile";

// testing linux

// method decorator
const prettyDate = (target: Object, propertyKey: string, descriptor: any) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const date = new Date(this._user.created);
    this._user.formatedDate = date.toDateString();
    return originalMethod.apply(this, args);
  };

  return descriptor;
};

export class UserOperations {
  private _user: UserData;
  constructor(user: UserData) {
    this._user = user;
    this._user.edit = false;
  }

  static createUsersArray(usersArray: any[]): UserData[] {
    let returnedArray: UserData[] = [];
    if (usersArray.length > 0) {
      usersArray.forEach((eachUser: any) => {
        const x = new UserOperations(eachUser);
        returnedArray.push(x.formattedUser());
      });
    }
    return returnedArray;
  }

  @prettyDate
  formattedUser() {
    return this._user;
  }
}
