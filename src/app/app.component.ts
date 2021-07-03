import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { mapTo, startWith, map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
