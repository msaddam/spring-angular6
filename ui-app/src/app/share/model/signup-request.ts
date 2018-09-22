
export interface ISignUpRequest {
  name?: string;
  username?: string;
  email?: string
  password?: string
}

export class SignUpRequest implements ISignUpRequest {
  constructor(
    public name?: string,
    public username?: string,
    public email?: string,
    public password?: string
  ){}
}
