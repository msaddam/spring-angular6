
import {RoleName} from "./role-name.enum";

export interface IRole {
  id?: number;
  name?: RoleName
}


export class Role implements IRole{
  constructor(
    public id?: number,
    public name?: RoleName
  ){}
}
