import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorSliderModule } from 'ngx-color/slider'; // <color-slider></color-slider>
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { RealfireComponent } from './realfire.component';
import { environment } from '../environments2/environment.prod';


const MODULE_ROUTES = [
  { path: '', component: RealfireComponent }
];

@NgModule({
  declarations: [RealfireComponent],
  imports: [
    CommonModule,
    RouterModule,
    ColorSketchModule,
    ColorSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    FormsModule,
    RouterModule.forChild(MODULE_ROUTES)
  ],

})
export class RealfireModule { }
