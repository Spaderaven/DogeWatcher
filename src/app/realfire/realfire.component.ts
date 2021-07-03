import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subscription } from 'rxjs';
import { mapTo, startWith, map, flatMap, delay } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { MiserviceService } from '../miservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-realfire',
  templateUrl: './realfire.component.html',
  styleUrls: ['./realfire.component.scss']
})
export class RealfireComponent implements AfterViewInit{

  newEventSubscription: Subscription;

  newRes = [];

  constructor(private router: Router, private _http: HttpClient, private db: AngularFireDatabase, private route: ActivatedRoute, private miService: MiserviceService ) {

    const res = this.route.snapshot.paramMap.get("element");
    this.newRes = res.split(",");
  }

  ngOnInit(): void {
  }


  ngAfterViewInit()	{

    
    const tutRef = this.db.object('users');

    const user = {
      "r86V5YDkvXQif0edpN6w": {
        stop: true,
        valueHigh: this.newRes[2] == "High" ? true : false,
        valueLow: this.newRes[2] == "Low" ? true : false,
        color: this.newRes[1]
      }
    }
 
    // set() for destructive updates
    tutRef.update(user);

  }



}
