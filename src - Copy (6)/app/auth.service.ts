import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private login_url = "http://109.74.206.37/user/api/user_login";
  private reg_url = "http://109.74.206.37/user/api/user_register";
  private masterlogin = "http://109.74.206.37/user/api/master_login";

  constructor(private http:HttpClient) { }

  user_login(data:any){
   return this.http.post(this.login_url,data);
  }

  user_reg(data:any):Observable<any>{
    return this.http.post(this.reg_url,data);
   }
  
  master_login(data:any):Observable<any>{
    return this.http.post(this.masterlogin,data);
  }

}
