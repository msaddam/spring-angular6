import { Component, OnInit } from '@angular/core';
import {Country, ICountry} from "../../share/model/country";
import {CountryService} from "../../share/service/country.service";
import {RegionService} from "../../share/service/region.service";
import {Title} from "@angular/platform-browser";

import * as R from 'ramda';
import {IRegion, Region} from "../../share/model/region";
import {HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country?: ICountry = new Country();
  countrys?: ICountry[];
  regions?: IRegion[];

  reverse: any;
  totalItems: number;

  successMessage: string;
  errorMessage: string;

  onlyNumbers?: string = "/^\\d+([,.]\\d+)?$/";

  constructor(private countryService: CountryService, private regionService: RegionService, private titleService: Title) {
    this.country.ctrRegion = new Region();
    this.countrys = [];
    this.regions = [];
    this.successMessage = '';
    this.errorMessage = '';

    titleService.setTitle('Country');
  }


  ngOnInit() {
    this.getAllCountry()
    this.getAllRegion()
  }


  submit() {
    console.log('Submitting');
    if (this.country.ctrId === undefined || this.country.ctrId === null) {
      console.log('Saving New Country', this.country);
      this.createCountry(this.country);
    } else {
      this.updateCountry(this.country);
      console.log('Country updated with id ', this.country.ctrId);
    }
  }

  createCountry(country: ICountry) {
    console.log('About to create user');
    this.countryService.create(country)
      .subscribe(
        (res: HttpResponse<ICountry>) => this.createUpdateMsg('Country created successfully'),
        (res: HttpErrorResponse) => this.onError(res.message),

      );
  }


  updateCountry(country: ICountry){
    console.log('About to update user');
    this.countryService.update(country)
      .subscribe(
        (res: HttpResponse<ICountry>) => this.createUpdateMsg('Country updated successfully'),
        (res: HttpErrorResponse) => this.onError(res.message),
      );
  }

  removeCountry(id){
    console.log('About to remove Country with id '+id);
    this.countryService.delete(id)
      .subscribe(
        (res: HttpResponse<ICountry>) => this.createUpdateMsg(''),
        (res: HttpErrorResponse) => this.onError(res.message),
      );
  }

  getAllRegion(){
    this.regionService.findAll()
      .subscribe(
        (res: HttpResponse<IRegion[]>) => this.paginateRegion(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  getAllCountry(){
    this.countryService.findAll()
      .subscribe(
        (res: HttpResponse<ICountry[]>) => this.paginateCountry(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  onError(message: string){
    this.errorMessage = message;
  }

  private createUpdateMsg(successMessage: string) {
    this.resetCountryForm();
    this.successMessage = successMessage;
  }
  private paginateRegion(data: IRegion[], headers: HttpHeaders) {
    // this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.regions.push(data[i]);
    }
  }


  private paginateCountry(data: ICountry[], headers: HttpHeaders) {
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.countrys = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].ctrRegion === undefined || data[i].ctrRegion === null ){
        data[i].ctrRegion = new Region();
      }
      this.countrys.push(data[i]);
    }
  }

  editCountryByObj(country) {
    this.country = R.clone(country);
  }
  editCountry(id) {
    this.successMessage='';
    this.errorMessage='';

    this.countryService.find(id).subscribe(
      function (user) {
        console.log(user)
        this.country = user.body;
        this.country.ctrName = 'res'
      },
      function (errResponse) {
        console.error('Error while removing user ' + id + ', Error :' + errResponse.data);
      }
    );
  }
  resetCountryForm(){
    this.successMessage='';
    this.errorMessage='';
    this.country= new Country();
    this.country.ctrRegion = new Region();
    this.getAllCountry();
  }

}
