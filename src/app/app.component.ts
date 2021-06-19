import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { mapTo, startWith, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts;
  info;

  user = {
    id: 0,
    name: "",
    configs: {
      valueHigh: 10000,
      colorHigh: "#fff",
      valueLow: 0.00,
      colorLow: "#fff"
    }
  };

  constructor( private _http: HttpClient ) {
  }

  ngOnInit() {
     this.posts = interval(1000).subscribe( x => {
      this._http.get('https://api.coingecko.com/api/v3/simple/price?ids=Dogecoin&vs_currencies=btc')
      .pipe(map(data => this.info = data)).subscribe(result => {this.CheckPrice(result)} ) 
    })
    console.log(this.user);
  }

  CheckPrice(result)  {
    console.log(result);
    if(result?.dogecoin.btc >= this.user?.configs?.valueHigh){ this.SendColor(this.user?.configs?.colorHigh) }
    else if(result?.dogecoin.btc <= this.user?.configs?.valueLow){ this.SendColor(this.user?.configs?.colorLow) }
  }

  changeCompleteGoodPrice(event){
    console.log(event);
    // Save Database
  }

  changeCompleteBadPrice(event){
    console.log(event);
  }

  SendColor(color){
    console.log(color);
    
  }

  onEnter(){
    console.log(this.user);
  }

}
