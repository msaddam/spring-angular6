
import {IRegion} from "./region";

export interface ICountry {
  ctrId?: number;
  ctrName?: string;
  ctrCode?: string;
  ctrIsoCode2?: string;
  ctrIsoCode3?: string;
  ctrTimeZone?: string;
  ctrPopulation?: number;
  ctrRegion?: IRegion;
}

export class Country implements ICountry {
  constructor(
    public ctrId?: number,
    public ctrName?: string,
    public ctrCode?: string,
    public ctrIsoCode2?: string,
    public ctrIsoCode3?: string,
    public ctrTimeZone?: string,
    public ctrPopulation?: number,
    public ctrRegion?: IRegion,
  ) {}
}
