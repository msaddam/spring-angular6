import {IRole} from "./role";

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  roles?: IRole[];
}

export class User implements IUser{
  constructor(
    public id?: number,
    public name?: string,
    public username?: string,
    public email?: string,
    public password?: string,
    public roles?: IRole[]
  ){}
}
