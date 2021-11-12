import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-registation',
  templateUrl: './registation.page.html',
  styleUrls: ['./registation.page.scss'],
})
export class RegistationPage implements OnInit {

  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit() {
   
  }

  register(){
    const data = {
      name:"Testname",
      email:"test@gmail.com",
      password:"Anurag11@pati"
    }
    this.auth.user_reg(data).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('token',res.token);
      this.route.navigate(['/loginpage']);
    })
  }
}
