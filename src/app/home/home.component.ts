import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { mapTo, startWith, map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MiserviceService } from '../miservice.service';
import { RealfireComponent } from '../realfire/realfire.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  posts;
  info;
  isChange = false;
  isLoading = true;
  user: any;
  fireBaseId;

  prueba;
  newHighValue;
  newLowValue;
  newHigColor;
  newLowColor;

  @Output() messageEvent = new EventEmitter<string>();

  constructor( private router: Router, private _http: HttpClient, private store: AngularFirestore, private route: ActivatedRoute, private miService: MiserviceService ) {

    const elem = this.route.snapshot.paramMap.get("element");
    this.fireBaseId = elem;    
    

    this.prueba = this.store.collection('users').snapshotChanges();      

    this.store.collection('users').doc(elem).ref.get().then( (doc) => this.GetUser(doc) );
  }
  
  GetUser(doc) {
    if (doc.exists) {      
      this.user = doc.data();      
      
      this.isLoading = false;
    } else {      
      console.log("There is no document!");
    }
  }

  ngOnInit() {
     this.posts = interval(1000).subscribe( x => {
      this._http.get('https://api.coingecko.com/api/v3/simple/price?ids=Dogecoin&vs_currencies=mxn')
      .pipe(map(data => this.info = data)).subscribe(result => {this.CheckPrice(result)} ) 
    })    
  }

  CheckPrice(result)  {
    if(result?.dogecoin.mxn >= this.user?.valueHigh){ 
      const res = this.fireBaseId + "," + this.user?.colorHigh + "," + "High";
      this.SendColor(res)
     }
    else if(result?.dogecoin.mxn <= this.user?.valueLow){ 
      const res = this.fireBaseId + "," + this.user?.colorLow + "," + "Low";
      this.SendColor(res)
     }
  }

  changeCompleteGoodPrice(event){    
    this.isChange = true
    this.newHigColor = event.color.hex;
  }

  changeCompleteBadPrice(event){    
    this.isChange = true
    this.newLowColor = event.color.hex;
  }

  onEnter() {
    const newUser = {
      valueHigh: this.newHighValue ? this.newHighValue : this.user.valueHigh,
      colorHigh: this.newHigColor ? this.newHigColor : this.user?.colorHigh,
      valueLow: this.newLowValue ? this.newLowValue : this.user.valueLow,
      colorLow: this.newLowColor ? this.newLowColor : this.user?.colorLow,
      email: this.user.email,
      password: this.user.password
    };
    
    this.store.collection('users').doc(this.fireBaseId).set(newUser);
    this.user = newUser;    
    this.isChange = false
  }

  SendColor(res){    
    this.miService.sendNewEvent(res);
    this.router.navigate(["/fire", {element: res}])
  }

}
