import { UserData } from "./tsfile";

// method decorator
const prettyDate = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const date = new Date(this._user.created);
    this._user.formatedDate = date.toDateString();
    return originalMethod.apply(this, args);
  };

  return descriptor;
};

export class UserOperations {
  private _user;
  constructor(user: UserData) {
    this._user = user;
  }

  @prettyDate
  logUser() {
    console.log(this._user);
  }
}
