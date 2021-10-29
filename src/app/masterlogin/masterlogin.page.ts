import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-masterlogin',
  templateUrl: './masterlogin.page.html',
  styleUrls: ['./masterlogin.page.scss'],
})
export class MasterloginPage implements OnInit {

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

    this.auth.master_login(data).subscribe((res)=>{
      console.log(res);
      this.data = res;
      localStorage.setItem('token',this.data.token)
      this.route.navigate(['/iframe'],{queryParams:{token:this.data.token}}).then(()=>location.reload());
    },
    (err)=>{
      console.log(err);
    }
    )
  }
}
