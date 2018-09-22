import { Component, OnInit } from '@angular/core';
import {IRegion, Region} from "../../share/model/region";
import {RegionService} from "../../share/service/region.service";
import {Title} from "@angular/platform-browser";

import * as R from 'ramda';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {


  region?: IRegion = new Region();
  regions?: IRegion[];

  totalItems: number;

  successMessage: string;
  errorMessage: string;

  constructor(private regionService: RegionService, private titleService: Title) {
    this.regions = [];
    this.successMessage = '';
    this.errorMessage = '';

    titleService.setTitle('Region');
  }


  ngOnInit() {
    this.getAllRegion()
  }


  submit() {
    console.log('Submitting');
    if (this.region.rgnId === undefined || this.region.rgnId === null) {
      console.log('Saving New Region', this.region);
      this.createRegion(this.region);
    } else {
      this.updateRegion(this.region);
      console.log('Region updated with id ', this.region.rgnId);
    }
  }

  createRegion(region: IRegion) {
    console.log('About to create Region');
    this.regionService.create(region)
      .subscribe(
        (res: HttpResponse<IRegion>) => this.createUpdateMsg('Region created successfully'),
        (res: HttpErrorResponse) => this.onError(res.message),

      );
  }


  updateRegion(region: IRegion){
    console.log('About to update user');
    this.regionService.update(region)
      .subscribe(
        (res: HttpResponse<IRegion>) => this.createUpdateMsg('Region updated successfully'),
        (res: HttpErrorResponse) => this.onError(res.message),
      );
  }

  removeRegion(id){
    console.log('About to remove Region with id '+id);
    this.regionService.delete(id)
      .subscribe(
        (res: HttpResponse<IRegion>) => this.createUpdateMsg(''),
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


  onError(message: string){
    this.errorMessage = message;
  }

  private createUpdateMsg(successMessage: string) {
    this.resetRegionForm();
    this.successMessage = successMessage;
  }
  private paginateRegion(data: IRegion[], headers: HttpHeaders) {
    // this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.regions = [];
    for (let i = 0; i < data.length; i++) {
      this.regions.push(data[i]);
    }
  }

  editRegionByObj(region) {
    this.region = R.clone(region);
  }

  resetRegionForm(){
    this.successMessage='';
    this.errorMessage='';
    this.region= new Region();
    this.getAllRegion();
  }

}
