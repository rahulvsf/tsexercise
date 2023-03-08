import { UserData } from "./tsfile";

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

function editProperty(editable: boolean) {
  return (target: any, propertyKey: string, descriptor: any) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      this._user.edit = editable;
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export class UserOperations {
  private _user;
  constructor(user: UserData, editable: boolean = false) {
    this._user = user;
    this._user.edit = editable;
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

  replaceWithNewObject(userDataArray: UserData[]) {
    const index = returnIndex(userDataArray, this._user);
    if (index != -1) {
      userDataArray[index] = this._user;
    }
    return userDataArray;
  }

  deleteUser(userDataArray: UserData[]) {
    const index = returnIndex(userDataArray, this._user);
    if (index != -1) {
      userDataArray.splice(index, 1);
    }
    return userDataArray;
  }
}

function returnIndex(arr: UserData[], user: UserData): number {
  const index = arr.findIndex((u: UserData) => u.mname == user.mname);
  return index;
}
