import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  { path: 'view', component: ViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
