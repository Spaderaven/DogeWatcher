import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MiserviceService {

  private subject = new Subject<any>();

  sendNewEvent(color){
    console.log("SERVOCe", color)
    this.subject.next();
  }

  getNewEvent():Observable<any>{
    return this.subject.asObservable();
  }

  constructor() { }
}
