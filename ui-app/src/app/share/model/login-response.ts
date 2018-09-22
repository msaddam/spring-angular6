
export interface ILoginResponse {
  accessToken?: string,
  tokenType?: string
}

export class LoginResponse implements ILoginResponse {
  constructor(
    public accessToken?: string,
    public tokenType?: string
  ){}
}
