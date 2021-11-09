import { Component, OnInit } from '@angular/core';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-bethistiry',
  templateUrl: './bethistiry.page.html',
  styleUrls: ['./bethistiry.page.scss'],
})
export class BethistiryPage implements OnInit {

  constructor(private bet:BetService) { }
  completedbets:any;
  ngOnInit() {

    this.bet.completed_bets(localStorage.getItem('uid')).subscribe((res)=>{
      console.log(res);
      this.completedbets = res.response;
    })
  }

}
