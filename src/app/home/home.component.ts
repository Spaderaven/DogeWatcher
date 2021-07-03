import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { mapTo, startWith, map, flatMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

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

  constructor( private _http: HttpClient, private store: AngularFirestore, private route: ActivatedRoute ) {

    const elem = this.route.snapshot.paramMap.get("element");
    this.fireBaseId = elem;
    console.log(elem);
    

    this.prueba = this.store.collection('users').snapshotChanges();  
    console.log("LA PUREBA: ", this.prueba);

    this.store.collection('users').doc(elem).ref.get().then( (doc) => this.GetUser(doc) );
  }
  
  GetUser(doc) {
    if (doc.exists) {
      console.log(doc.data());
      this.user = doc.data();
      console.log("NEW USER: ", this.user);
      
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
    console.log(this.user);
  }

  CheckPrice(result)  {
    if(result?.dogecoin.mxn >= this.user?.valueHigh){ this.SendColor(this.user?.colorHigh) }
    else if(result?.dogecoin.mxn <= this.user?.valueLow){ this.SendColor(this.user?.colorLow) }
  }

  changeCompleteGoodPrice(event){
    console.log(event.color.hex);
    this.isChange = true
    this.newHigColor = event.color.hex;
  }

  changeCompleteBadPrice(event){
    console.log(event);
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
    console.log("saved");
    
  }

  SendColor(color){
    console.log("EL COLOOOOOOOOOR", color);
    // SEND TO THE THIIIIIIIIING
  }

}
