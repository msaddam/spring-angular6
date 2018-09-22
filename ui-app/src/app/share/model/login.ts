
export interface ILogin {
  usernameOrEmail?: string,
  password?: string
}

export class Login implements ILogin {
  constructor(
    public usernameOrEmail?: string,
    public password?: string
  ){}
}
