import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
var auth_token = localStorage.getItem('token');
const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${auth_token}`);
@Injectable({
  providedIn: 'root'
})

export class BetService {
  
  private betcategories = "http://127.0.0.1/api/user/viewbetcategories";
  private wallet = "http://127.0.0.1/api/user/viewfinalwallet";
  private placebet = "http://127.0.0.1/api/user/placebet";
  private finalbet = "http://127.0.0.1/api/user/finalbet";
  private viewbetcategories = "http://127.0.0.1/api/user/viewbetcategories";
  private viewtimers = "http://127.0.0.1/api/user/viewtimers";
  private singlepayout = "http://127.0.0.1/api/user/singlepayout";
  private stock = "https://api.polygon.io/v3/reference/exchanges?apiKey=6sEFcNe2upitHW5lt9dp7EfkIuxoR58k";
  private livebtc = "https://api.polygon.io/v1/open-close/crypto/BTC/USD/2021-09-23?adjusted=true&apiKey=6sEFcNe2upitHW5lt9dp7EfkIuxoR58k";
  private liverate = "http://127.0.0.1/api/liverate";
  private completedbets = "http://127.0.0.1/api/user/viewfinalbets";
  private getmarketbytype = "http://127.0.0.1/api/user/getmarketbytype";
  constructor(private http:HttpClient) { }

  view_betcategories():Observable<any>{
    return this.http.get(this.viewbetcategories,{'headers':headers})
  }

  view_wallet():Observable<any>{
    return this.http.get(this.wallet ,{'headers':headers});
  }

  place_bet(data):Observable<any>{
    return this.http.post(this.placebet,data,{'headers':headers});
  }

  final_bet(data):Observable<any>{
    return this.http.post(this.finalbet,data,{'headers':headers});
  }

  view_timers(id:any):Observable<any>{
    return this.http.get(this.viewtimers+'/'+id,{'headers':headers});
  }

  single_payout(id:any):Observable<any>{
    return this.http.get(this.singlepayout+'/'+id,{'headers':headers});
  }

  stock_view():Observable<any>{
    return this.http.get(this.stock);
  }

  live_btc():Observable<any>{
    return this.http.get(this.livebtc);
  }

  live_rate():Observable<any>{
    return this.http.get(this.liverate);
  }

  completed_bets():Observable<any>{
    return this.http.get(this.completedbets,{'headers':headers});
  }

  getmarket_bytype(val):Observable<any>{
    return this.http.get(this.getmarketbytype+"?type="+val,{'headers':headers});
  }
}
