import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BetService } from '../bet.service';
import * as $ from "jquery";
import { webSocket } from "rxjs/webSocket";
declare const CanvasJS: any;
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-platform',
  templateUrl: './platform.page.html',
  styleUrls: ['./platform.page.scss'],
  providers:[DatePipe]
})
export class PlatformPage implements OnInit {
  dataPoints = [];
  dataPoints1 = [];
  currentDate: any;

  constructor(private bet:BetService, private route:Router,private datePipe: DatePipe, private http:HttpClient) { 
    
  }
  wallet:any;
  amount:any;
  initial:any;
  final:any;
  timers:any;
  payout = 0;
  input_amount = "";
  stocks:any;
  livedata:any;
  livedata1:any;
  duration = "";
  timer:any;
  exposure:any;
  markets:any;
  //datapoints = [];
  yval:any;
  chart:any;
  history = [];
  stockChart:any;
  socketData:any;
  ngOnInit() {
    this.load()
    this.load1()
    this.getstocks('crypto');
    this.exposure = 0;
    // this.bet.live_btc().subscribe((res)=>{
    //   console.log(res);
    //   this.livedata = res.close;

    //   setInterval(()=>{
    //     this.bet.live_btc().subscribe((res)=>{
    //       console.log(res);
    //       this.livedata = res.close;
    //     })
    //   },60000)
    // })

    this.bet.live_rate().subscribe((res)=>{
      // console.log(res);
      this.livedata1 = res.response;
      this.initial = this.livedata1;
      console.log(this.livedata1);

      setInterval(()=>{
        this.bet.live_rate().subscribe((res)=>{
          // console.log(res);
          this.livedata1 = res.response;
          this.final = this.livedata1;
          console.log(this.livedata);
        })
      },60000)
    })
    this.bet.stock_view().subscribe((res)=>{
      console.log(res);
      this.stocks = res.results;
    })
    console.log(this.input_amount);
    this.bet.view_timers().subscribe((res)=>{
      console.log(res);
      this.timers = res.response;
      // this.payout = res.response[0].payout;
      // console.log(this.payout);
    })
    this.bet.view_wallet().subscribe((res)=>{
      console.log(res);
      this.wallet = res;
      this.amount = this.wallet.response[0].amount;
      console.log(this.amount);
    })
    
    // setInterval(()=>{
    //   this.getlivedata;
    // },2000)
  }
  placebet_up(){
    console.log(this.initial);
    const data = {
      market : 'BTCUSD',
      betamount : +this.input_amount,
      duration : this.duration
    }
    console.log(data.duration);
    this.bet.place_bet(data).subscribe((res)=>{
      console.log(res);
      this.exposure = res.response.exposure;
      this.bet.view_wallet().subscribe((res)=>{
        this.amount = res.response[0].amount;
      })
      setTimeout(() => {
        var payout = this.payout.toString();
        var payout_arr = payout.split(".");
        console.log(payout_arr);
        const val = {
          market : 'BTCUSD',
          bet_id: res.response.id,
          betamount : data.betamount,
          duration : data.duration,
          start_date : res.response.start_date,
          start_time : res.response.start_time,
          profitloss : this.final>this.initial?((+payout_arr[1]*data.betamount)/100):this.final<this.initial?-data.betamount:0
        }
        console.log(val);
        this.bet.final_bet(val).subscribe((res)=>{
          console.log(this.final);
          console.log(res);
          this.exposure = 0;
          console.log(this.exposure);
          this.bet.view_wallet().subscribe((res)=>{
            this.amount = res.response[0].amount;
          })
        })
      },+this.timer*60*1000);
    })

    
  }

  placebet_down(){
    var final  = 2000;
    this.bet.view_betcategories().subscribe((res)=>{
      console.log(res);
      this.initial = res[0].amount;
    })
    const data = {
      betcategory_id : 3,
      betamount : -100,
      duration : "3"
    }
    this.bet.place_bet(data).subscribe((res)=>{
      console.log(res.start_date);
      setTimeout(() => {
        const val = {
          betcategory_id : 3,
          betamount : data.betamount,
          duration : data.duration,
          start_date : res.start_date,
          start_time : res.start_time,
          profitloss : this.initial + data.betamount - final
        }
        this.bet.final_bet(val).subscribe((res)=>{
          console.log(res);
        })
      },+data.duration*60*1000);
    })
  }
  pay_out(event:any){
    console.log(event.target.value);
    this.duration = event.target.value;
    this.bet.single_payout(event.target.value).subscribe((res)=>{
      console.log(res);
      this.payout = res.response[0].payout;
      this.timer = res.response[0].timer;
    })
  }

  bet_history(){
    this.route.navigate(['/bethistiry']);
  }

load(){
  $(document).ready(function(){
    $("#footericon").click(function(){
      $("#footerclick").show();
    });
  });  
}
load1(){
$(document).ready(function(){
  $("#plus").click(function(){
    $("#plusshow").toggle(1000);
  });
});  
}

stocksgraph(abbv:any){
  // console.log("stocksgraph");
  // const subject = webSocket("wss://socket.polygon.io/stocks");
  // subject.next({action:"auth",params:"ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6"});
  // subject.subscribe(
  //   (msg) => {console.log('message received: ' + msg);
  //   this.livedata = msg;
  // console.log('livedata',this.livedata);
  // for(var i=0;i<this.livedata.length;i++){
  //   if("p" in this.livedata[i]){
  //   var formattedTime = this.datePipe.transform(this.livedata[0].t,'HH:mm:ss');
  //   this.datapoints.push({y:this.livedata[0].p,label:formattedTime});
  //   console.log('datapoints',this.datapoints);
    
  //   }
  // }
  // for(var j=0;j<this.datapoints.length;j++){
  //   if(this.datapoints[j].label == "14:32:00"){
  //     this.yval = this.datapoints[j].y;
  //   }
  // }
  // this.chart = new CanvasJS.Chart("chartContainer1",{
  //   exportEnabled: true,
  //   backgroundColor: "#172331",
  //   title:{
  //     text:abbv
  //   },
  //   zoomEnabled:true,
  //   axisX:{
  //     title: "Red Color labels",
  //     labelFontColor: "white"
  //   },
  //   axisY:{
  //     labelFontColor: "white",
  //     stripLines:[
  //        {
           
  //          value:this.yval,                
  //          color:"red",
  //          thickness: 2
  //        }
  //        ]
  //   },
  //   data: [{
  //     type: "line",
  //     color:"green",
  //     dataPoints : this.datapoints,
  //   }
  // ]
  // });
  // console.log('chart',this.chart);
  // this.chart.render();
  
  
  // }, // Called whenever there is a message from the server.
  //   (err) => {console.log(err)}, // Called if at any point WebSocket API signals some kind of error.
  //   () => console.log('complete') // Called when connection is closed (for whatever reason).
  // );
  // subject.next({action:"subscribe",params:"T."+abbv});
}

cryptograph(abbv:any){
  this.currentDate = new Date();
  console.log("stocksgraph");
  // this.http.get('https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/2/minute/2021-10-22/2021-10-22?adjusted=true&sort=asc&apiKey=ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6')
  // .subscribe((data)=>{
  //   this.history.push(data);
  //   console.log('history',this.history[0]['results']);
  //   for(var i=0; i<this.history[0]['results'].length;i++){
  //     this.dataPoints.push({x:this.history[0]['results'][i].t, y:this.history[0]['results'].c});
  //     //this.stockChart.render();
  //   }
  // })
  const subject = webSocket("wss://socket.polygon.io/crypto");
  subject.next({action:"auth",params:"ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6"});
  subject.next({action:"subscribe",params:"XT.BTC-USD"});
  subject.subscribe((res)=>{
    this.socketData = res;
    console.log(this.socketData);
  })
  this.stockChart = new CanvasJS.StockChart("chartContainer",{
    theme:"dark1",
    title:{
      text:"BTC-USD"
    },
    rangeChanged:function(e){
      this.rangeChangedTriggered = true
    },
    charts:[
      {
        backgroundColor:"#172331",
        height:600,
        tooltip:{
          shared:true,
          content:"{name}:${y}"
        },
        axisX: {
          gridThickness: 0.15,
          gridColor: "grey",
          // interval : 15,
          // intervalType: 'second',
          valueFormatString: "HH:mm:s",
          stripLines: [{
            showOnTop: true,
            lineDashType: "dash",
            color: "#fff",
            labelFontColor: "#fff",
            labelFontSize: 14,
            thickness: 0.5
          }],
        },
        axisY2: {
          title: "Price",
          gridThickness: 0.15,
          gridColor: "grey",
          stripLines: [{
            showOnTop: true,
            thickness:0.25,
            lineDashType: "solid",
            color: "#fff",
            labelFontColor: "black",
            labelFontSize: 14,
            labelPlacement: "outside"
          }],
        },

        data: [
          {
            axisYType: "secondary",
            type: "area",
            name: "price",
            xValueFormatString: "MM DD, YYYY HH:mm:ss",
            xValueType: "dateTime",
            dataPoints : this.dataPoints,
            color:"#16293c",
            lineColor: "#33a9ff",
          },
          {
            axisYType: "secondary",
            type:"line",
            dataPoints: this.dataPoints1,
            xValueFormatString: "MM DD, YYYY HH:mm:ss",
            xValueType: "dateTime",
            lineThickness: 1,
            lineColor : "#fff",
            markerSize : 0
          }
          ]
      }
    ],
    navigator: {
      slider: {
        minimum: new Date(this.currentDate.getTime() - (90 * 1000))
      },
      axisX: {
        labelFontColor: "white"
      }
    },
    rangeSelector: {
      enabled: true
    }
  })
  this.gethistory();
  // this.gethistory().then(()=>{
  //   setInterval(()=>{
  //     this.updatechart();
  //   },1000)
  // });
  // this.gethistory().then((res)=>{
  //   setInterval(()=>{
  //     this.updatechart()
  //   },300);
  // })
  // setInterval(()=>{
  //   this.updatechart();
  // },1000);
}
updatechart(){
  console.log('current_data_before',this.dataPoints);
  this.dataPoints.push({x:this.socketData[0].t,y:this.socketData[0].p});

  
  console.log('current_data_after',this.dataPoints);
  this.stockChart.render();
  // this.stockChart.navigator.axisX[0].set("intervalType","second");
  // this.stockChart.navigator.axisX[0].set("interval",15);
}
gethistory(){
  return new Promise<void>((resolve, reject) => {
    this.http.get('https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/minute/2021-10-25/2021-10-25?adjusted=true&sort=asc&apiKey=ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6')
  .subscribe((data)=>{
    this.history.push(data);
    var interval = 340;
    console.log('history',this.history[0]['results']);
    var xVal = this.history[0]['results'][0].t;
    console.log(xVal);
    for(var i=0; i<this.history[0]['results'].length;i++){
      this.dataPoints.push({x:this.history[0]['results'][i].t, y:this.history[0]['results'][i].c});
      xVal += interval;
      // this.stockChart.navigator.axisX[0].set("intervalType","second");
      // this.stockChart.navigator.axisX[0].set("interval",60);
    }

    var datalength = this.dataPoints.length;
    console.log('datalength',datalength);
    var datapoints2 = this.dataPoints;
    console.log('datapoints2',datapoints2);
    for(var j=1;j<datalength-2;j++){ 
      console.log(j);
      //if(datapoints2[j+1].y && datapoints2[j].y)
      {
     // var rand = Math.floor(Math.random() * datapoints2[j+1].y) + datapoints2[j].y;
      var rand=this.getRandomIntInclusive(datapoints2[j+1].y,datapoints2[j].y);
      console.log(rand);
      this.dataPoints.splice(j+1,0,{x:datapoints2[j].x+300,y:rand});
      console.log('history_in_for',this.dataPoints);
      }
    }
    this.stockChart.render();
    console.log('history_data_out_for',this.dataPoints);
    console.log("history");
    resolve();
  })
  })
}
  getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
getstocks(type:any){
  console.log(type);
  this.bet.getmarket_bytype(type).subscribe((res)=>{
    this.markets = res.response;
    console.log(this.markets);
  })
}


}
