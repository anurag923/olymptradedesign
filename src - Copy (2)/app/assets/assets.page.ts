import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
})
export class AssetsPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
  sliderFour: any;
  sliderFive: any;
  sliderSix: any;


  //Configuration for each Slider

slideOptsThree = {
  initialSlide:1,
  slidesPerView: 5,
  loop: true,
  centeredSlides: true,
  spaceBetween: 15,
  autoplay:true,
  breakpoints: {
      1500: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1366: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1200: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      991: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      767: {
          initialSlide: 1,
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 10,
      },
      575: {
          initialSlide: 1,
          slidesPerView:2.5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      // when window width is <= 320px
      320: {
          initialSlide: 1,
          slidesPerView: 2,
          centeredSlides: true,
          spaceBetween: 10,
      },
  }
};
slideOptsFive = {
  initialSlide:1,
  slidesPerView: 5,
  loop: true,
  centeredSlides: true,
  spaceBetween: 15,
  autoplay:true,
  breakpoints: {
      1500: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1366: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1200: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      991: {
          initialSlide: 1,
          slidesPerView: 4,
          centeredSlides: true,
          spaceBetween: 10,
      },
      767: {
          initialSlide: 1,
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 10,
      },
      575: {
          initialSlide: 1,
          slidesPerView:2.5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      // when window width is <= 320px
      320: {
          initialSlide: 1,
          slidesPerView: 2,
          centeredSlides: true,
          spaceBetween: 10,
      },
  }
};
slideOptsFour = {
  initialSlide:1,
  slidesPerView: 5,
  loop: true,
  centeredSlides: true,
  spaceBetween: 15,
  autoplay:true,
  breakpoints: {
      1500: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1366: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1200: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      991: {
          initialSlide: 1,
          slidesPerView: 4,
          centeredSlides: true,
          spaceBetween: 10,
      },
      767: {
          initialSlide: 1,
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 10,
      },
      575: {
          initialSlide: 1,
          slidesPerView:2.5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      // when window width is <= 320px
      320: {
          initialSlide: 1,
          slidesPerView: 2.5,
          centeredSlides: true,
          spaceBetween: 10,
      },
  }
};
slideOptsSix = {
  initialSlide:1,
  slidesPerView: 5,
  loop: true,
  centeredSlides: true,
  spaceBetween: 15,
  autoplay:true,
  breakpoints: {
      1500: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1366: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 15,
      },
      1200: {
          initialSlide: 1,
          slidesPerView: 5,
          centeredSlides: true,
          spaceBetween: 10,
      },
      991: {
          initialSlide: 1,
          slidesPerView: 4,
          centeredSlides: true,
          spaceBetween: 10,
      },
      767: {
          initialSlide: 1,
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 10,
      },
      575: {
          initialSlide: 1,
          slidesPerView:2,
          centeredSlides: true,
          spaceBetween: 5,
      },
      // when window width is <= 320px
      320: {
          initialSlide: 1,
          slidesPerView: 2,
          centeredSlides: true,
          spaceBetween: 5,
      },
  }
};

  constructor(private router:Router) { 
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
    this.sliderFour =
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
    this.sliderFive =
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
    this.sliderSix =
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
