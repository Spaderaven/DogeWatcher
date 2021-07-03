import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { mapTo, startWith, map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  posts;
  info;
  isChange = false;

  user = {
    id: 0,
    name: "",
    valueHigh: 10000,
    colorHigh: "#fff",
    valueLow: 0.00,
    colorLow: "#fff"
  };

  prueba;
  newHighValue;
  newLowValue;
  newHigColor;
  newLowColor;

  constructor( private _http: HttpClient, private store: AngularFirestore ) {
    this.prueba = this.store.collection('users').snapshotChanges();  
    console.log("LA PUREBA: ", this.prueba);

    this.store.collection('users').doc("VRbUyz3whrCc9749Zw8W").ref.get().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
      } else {
        console.log("There is no document!");
      }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
    });    

    // this.store.collection('users').add(this.user);

    this.store.collection('users').valueChanges().subscribe(val => console.log(val))
    this.store.collection('users').get().subscribe(val => console.log(val))
  }

  ngOnInit() {
     this.posts = interval(1000).subscribe( x => {
      this._http.get('https://api.coingecko.com/api/v3/simple/price?ids=Dogecoin&vs_currencies=mxn')
      .pipe(map(data => this.info = data)).subscribe(result => {this.CheckPrice(result)} ) 
    })
    console.log(this.user);
  }

  CheckPrice(result)  {
    console.log(result);
    if(result?.dogecoin.btc >= this.user?.valueHigh){ this.SendColor(this.user?.colorHigh) }
    else if(result?.dogecoin.btc <= this.user?.valueLow){ this.SendColor(this.user?.colorLow) }
  }

  changeCompleteGoodPrice(event){
    console.log(event.color.hex);
    this.isChange = true
    this.newHigColor = event.color.hex;
    // Save Database
  }

  changeCompleteBadPrice(event){
    console.log(event);
    this.isChange = true
    this.newLowColor = event.color.hex;
  }

  onEnter() {
    console.log(this.user);
    console.log(this.newHighValue);
    const newUser = {
      valueHigh: this.newHighValue,
      colorHigh: this.newHigColor,
      valueLow: this.newLowValue,
      colorLow: this.newLowColor
    };
    
    this.store.collection('users').add(newUser);
  }

  SendColor(color){
    console.log(color);
    // SEND TO THE THIIIIIIIIING
  }

}
