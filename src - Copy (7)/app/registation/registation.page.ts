import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-registation',
  templateUrl: './registation.page.html',
  styleUrls: ['./registation.page.scss'],
})
export class RegistationPage implements OnInit {
  data:any;
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;
  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 4,
    loop: true,
    centeredSlides: true,
    spaceBetween: 15,
    autoplay:true,
    breakpoints: {
        1500: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 15,
        },
        1366: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 15,
        },
        1200: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
        },
        991: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
        },
        767: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
        },
        575: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
        },
        // when window width is <= 320px
        320: {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 10,
        },
    }
  };
  
  slideOptsThree = {
  initialSlide: 1,
  slidesPerView: 4,
  loop: true,
  centeredSlides: true,
  spaceBetween: 15,
  autoplay:true,
  breakpoints: {
      1500: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1366: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1200: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 10,
      },
      991: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 10,
      },
      767: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 10,
      },
      575: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 10,
      },
      // when window width is <= 320px
      320: {
          initialSlide: 1,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 10,
      },
  }
  };
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
