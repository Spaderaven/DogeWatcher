import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorSliderModule } from 'ngx-color/slider'; // <color-slider></color-slider>
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { HomeComponent } from './home.component';


const MODULE_ROUTES = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    ColorSketchModule,
    ColorSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    FormsModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class HomeModule { }
