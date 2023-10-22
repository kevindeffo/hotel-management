import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr"
import { HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { HotelModule } from './hotels/hotel.module';

registerLocaleData(localeFr,"fr")
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
      RouterModule.forRoot([
        {path: "home", component: HomeComponent},
        {path: '', redirectTo: 'home', pathMatch: "full"},
        {path: '**', redirectTo: 'home', pathMatch: "full"}
      ]),
      HotelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
