export interface IRegion {
  rgnId?: number;
  rgnName?: string;
}

export class Region implements IRegion {
  constructor(
    public rgnId?: number,
    public rgnName?: string,
  ) {}
}
