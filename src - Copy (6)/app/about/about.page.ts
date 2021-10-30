import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;

 //Configuration for each Slider

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

  constructor( ) { 
    
    
  }

  ngOnInit() {
  }

}
