import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryComponent} from "./entity/country/country.component";
import {RegionComponent} from "./entity/region/region.component";

const routes: Routes = [
  {
    path: 'country',
    component: CountryComponent
  },{
    path: 'region',
    component: RegionComponent
  },
  { path: '', redirectTo: 'region', pathMatch: 'full' },
  { path: '**', redirectTo: 'region' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
