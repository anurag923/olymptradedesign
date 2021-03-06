import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {
  data:any;
  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit() {
  }
  login(){
    alert('login');
    const data = {
      email:"anuragpati074@gmail.com",
      password:"Anurag11@pati"
    }

    this.auth.user_login(data).subscribe((res)=>{
      console.log(res);
      this.data = res;
      localStorage.setItem('token',this.data.token)
      this.route.navigate(['/platform']).then(()=>location.reload());
    },
    (err)=>{
      console.log(err);
    }
    )
  }
}
