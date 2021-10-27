import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-olymphome',
  templateUrl: './olymphome.page.html',
  styleUrls: ['./olymphome.page.scss'],
})
export class OlymphomePage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;


  //Configuration for each Slider

  slideOptsTwo = {
    initialSlide: 5,
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


  constructor(private router:Router) { 
    //Item object for Nature
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 995
        },
        {
          id: 925
        },
        {
          id: 940
        },
        {
          id: 943
        },
        {
          id: 944
        }
      ]
    };
    //Item object for Food

    //Item object for Fashion
    this.sliderThree =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 643
        },
        {
          id: 532
        },
        {
          id: 232
        },
        {
          id: 874
        },
        {
          id: 193
        }
      ]
    };
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(100).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(100).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }



  ngOnInit() {
  }

  loginpage(){
    this.router.navigate(['/loginpage']);
  }
  
  registration(){
    this.router.navigate(['/registation']);
  }
 

}
