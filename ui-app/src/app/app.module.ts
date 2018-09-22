import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RegionComponent } from './entity/region/region.component';
import { CountryComponent } from './entity/country/country.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    RegionComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
