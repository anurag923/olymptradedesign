import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BetService } from '../bet.service';
import * as $ from "jquery";
import { webSocket } from "rxjs/webSocket";
declare const CanvasJS: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.page.html',
  styleUrls: ['./iframe.page.scss'],
})
export class IframePage implements OnInit {

  dataPoints = [];
  dataPoints1 = [];
  currentDate: any;

  constructor(private bet: BetService, private route: Router, private http: HttpClient) {

  }
  wallet: any;
  amount: any;
  initial: any;
  final: any;
  timers: any;
  payout = 0;
  input_amount = "";
  stocks: any;
  livedata: any;
  livedata1: any;
  duration = "";
  timer: any;
  exposure: any;
  markets: any;
  //datapoints = [];
  yval: any;
  chart: any;
  history = [];
  stockChart: any;
  socketData: any;
  dataupdated: any;
  datapointsarr: any;
  is_updatechart = false;
  current_val:any;
  market_names = [];
  ngOnInit() {
    console.log(window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('token');
    console.log(myParam);
    // const headers= new HttpHeaders()
    // .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Authorization',`Bearer ${myParam}`);
    // console.log(headers);
    // this.http.get('http://109.74.206.37/user/api/master/viewfinalwallet',{'headers':headers}).subscribe((res) => {
    //   console.log(res);
    //   this.wallet = res;
    //   this.amount = this.wallet.response[0].amount;
    //   console.log(this.amount);
    // })
    this.load()
    this.load1()
    this.getstocks('crypto');
    this.exposure = 0;
    

    // this.bet.live_rate().subscribe((res) => {
     
    //   this.livedata1 = res.response;
    //   this.initial = this.livedata1;
    //   console.log(this.livedata1);

    //   setInterval(() => {
    //     this.bet.live_rate().subscribe((res) => {
          
    //       this.livedata1 = res.response;
    //       this.final = this.livedata1;
    //       console.log(this.livedata);
    //     })
    //   }, 60000)
    // })
    // this.bet.stock_view().subscribe((res) => {
    //   console.log(res);
    //   this.stocks = res.results;
    // })
    console.log(this.input_amount);

    
  }
  placebet_up() {
    console.log(this.socketData[this.socketData.length-1]);
    this.initial = this.socketData[this.socketData.length-1][0].p;
    console.log(this.initial);
    const data = {
      market: 'BTCUSD',
      betamount: +this.input_amount,
      duration: this.duration
    }
    console.log(data.duration);
    this.bet.place_bet(data).subscribe((res) => {
      console.log(res);
      this.exposure = res.response.exposure;
      this.bet.view_wallet().subscribe((res) => {
        this.amount = res.response[0].amount;
      })
      setTimeout(() => {
        var payout = this.payout.toString();
        var payout_arr = payout.split(".");
        console.log(payout_arr);
        console.log(this.socketData[this.socketData.length-1]);
        this.final = this.socketData[this.socketData.length-1][0].p;
        console.log(this.final);
        const val = {
          market: 'BTCUSD',
          bet_id: res.response.id,
          betamount: data.betamount,
          duration: data.duration,
          start_date: res.response.start_date,
          start_time: res.response.start_time,
          profitloss: this.final > this.initial ? ((+payout_arr[1] * data.betamount) / 100) : this.final < this.initial ? -data.betamount : 0
        }
        console.log(val);
        this.bet.final_bet(val).subscribe((res) => {
          
          console.log(res);
          this.exposure = 0;
          console.log(this.exposure);
          this.bet.view_wallet().subscribe((res) => {
            this.amount = res.response[0].amount;
          })
        })
      }, +this.timer * 60 * 1000);
    })


  }

  placebet_down() {
    var final = 2000;
    this.bet.view_betcategories().subscribe((res) => {
      console.log(res);
      this.initial = res[0].amount;
    })
    const data = {
      betcategory_id: 3,
      betamount: -100,
      duration: "3"
    }
    this.bet.place_bet(data).subscribe((res) => {
      console.log(res.start_date);
      setTimeout(() => {
        const val = {
          betcategory_id: 3,
          betamount: data.betamount,
          duration: data.duration,
          start_date: res.start_date,
          start_time: res.start_time,
          profitloss: this.initial + data.betamount - final
        }
        this.bet.final_bet(val).subscribe((res) => {
          console.log(res);
        })
      }, +data.duration * 60 * 1000);
    })
  }
  pay_out(event: any) {
    console.log(event.target.value);
    this.duration = event.target.value;
    this.bet.single_payout(event.target.value).subscribe((res) => {
      console.log(res);
      this.payout = res.response[0].payout;
      this.timer = res.response[0].timer;
    })
  }

  bet_history() {
    this.route.navigate(['/bethistiry']);
  }

  load() {
    $(document).ready(function () {
      $("#footericon").click(function () {
        $("#footerclick").show();
      });
    });
  }
  load1() {
    $(document).ready(function () {
      $("#plus").click(function () {
        $("#plusshow").toggle(1000);
      });
    });
  }

  stocksgraph(abbv: any) {
    
  }

  cryptograph(abbv: any) {
    this.currentDate = new Date();
    console.log("stocksgraph");
    this.gethistory();
    this.stockChart = new CanvasJS.StockChart("chartContainer", {
      theme: "dark1",
      title: {
        text: "BTC-USD"
      },
      rangeChanged: function (e) {
        this.rangeChangedTriggered = true
      },
      charts: [
        {
          backgroundColor: "#172331",
          height: 600,
          tooltip: {
            shared: true,
            content: "{name}:${y}"
          },
          axisX: {
            gridThickness: 0.15,
            gridColor: "grey",
            interval: 15,
            intervalType: 'second',
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
              thickness: 0.25,
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
              dataPoints: this.dataPoints,
              color: "#16293c",
              lineColor: "#33a9ff",
            },
            {
              axisYType: "secondary",
              type: "line",
              dataPoints: this.dataPoints1,
              xValueFormatString: "MM DD, YYYY HH:mm:ss",
              xValueType: "dateTime",
              lineThickness: 1,
              lineColor: "#fff",
              markerSize: 0
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
    setTimeout(() => {
      console.log("this.dataPoints.length", this.dataPoints.length);
      if (this.dataPoints.length > 1000) {
        console.log("if part");
        const subject = webSocket("wss://socket.polygon.io/crypto");
        subject.next({ action: "auth", params: "ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6" });
        subject.next({ action: "subscribe", params: "XT.BTC-USD" });
        subject.subscribe((res) => {
          this.socketData = res;
          console.log(this.socketData);
          
          if ('p' in this.socketData[0]) {
            
            this.dataPoints.push({ x: this.dataPoints[this.dataPoints.length-1].x+1000*15, y: this.socketData[0].p })
          }
          this.stockChart.render();
          
          console.log('from graph',this.stockChart.charts[0].data[0].dataPoints);
        })

      }
      else {
        console.log("else part");
      }
    }, 1000 * 10);

  }

  updatechart() {
    console.log('current_data_before', this.dataPoints);

    console.log('this.is_updatechart', this.is_updatechart);
    console.log(this.history);
    if (this.is_updatechart == false) {
      for (var i = 0; i < this.history[0]['results'].length; i++) {
        this.dataPoints.push({ x: this.history[0]['results'][i].t, y: this.history[0]['results'][i].c })
      }
      this.is_updatechart = true;
    }
    if ('p' in this.socketData[0]) {
      this.dataPoints.push({ x: this.socketData[0].t, y: this.socketData[0].p });
    }
    console.log('updatechart', this.dataPoints);
    this.stockChart.render();
    console.log('stockchart', this.stockChart);
  }
  gethistory() {
    return new Promise<void>((resolve, reject) => {
      this.http.get('https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/minute/2021-10-26/2021-10-26?adjusted=true&sort=asc&apiKey=ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6')
        .subscribe((data) => {
          this.history.push(data);
          var interval = 340;
          console.log('history', this.history[0]['results']);
          var xVal = this.history[0]['results'][0].t;
          console.log(xVal);
          for (var i = 0; i < this.history[0]['results'].length; i++) {
            this.dataPoints.push({ x: this.history[0]['results'][i].t, y: this.history[0]['results'][i].c });
            var max = 0;
            var min = 0;
            console.log('history',this.dataPoints);
            if(this.dataPoints.length>=2){
            if (this.dataPoints[this.dataPoints.length-2].y > this.dataPoints[this.dataPoints.length-1].y) {
              max = this.dataPoints[this.dataPoints.length-2].y;
              min = this.dataPoints[this.dataPoints.length-1].y;
            }
            else {

              max = this.dataPoints[this.dataPoints.length-1].y;
              min = this.dataPoints[this.dataPoints.length-2].y;
            }

            for(var k=0;k<=4;k++)
            {
              
              var rand = this.getRandomIntInclusive(min, max);
              console.log(rand);
              this.dataPoints.push({ x: this.history[0]['results'][i].t+15000, y:rand});
              
            }
          }
          
           
            
            console.log('here');
            xVal += interval;
          }

          var datalength = this.dataPoints.length;
          console.log('datalength', datalength);
          var datapoints2 = this.dataPoints;
          console.log('datapoints2', datapoints2);
          for (var j = 0; j < datalength - 2; j++) {
            console.log(j);
            {
              console.log(datapoints2[j + 1].y, datapoints2[j].y);
              var max = 0;
              var min = 0;
              if (datapoints2[j].y > datapoints2[j + 1].y) {
                max = datapoints2[j].y;
                min = datapoints2[j + 1].y;
              }
              else {

                max = datapoints2[j + 1].y;
                min = datapoints2[j].y;
              }
              var rand = this.getRandomIntInclusive(min, max);
              console.log(rand);
              this.dataPoints.splice(j + 1, 0, { x: datapoints2[j].x + (1000 * 15), y: rand });
              
            }
          }
          console.log('from history', this.dataPoints);
          this.stockChart.render();
          


          resolve();



        })
    })
  }
  getRandomIntInclusive1(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  counter = 1;
  getRandomIntInclusive(min, max) {
    this.counter = this.counter + 1;

    if (this.counter > 50) {
      this.counter = 0;
    }
    var returnvalue = min + (this.counter / 2);

    return returnvalue;

  }
  getstocks(type: any) {
    // console.log(type);

    // this.bet.getmarket_bytype(type).subscribe((res) => {
    //   this.markets = res.response;
    //   console.log(this.markets);
    // })
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('token');
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${myParam}`);
    console.log(headers);
    this.http.get('http://109.74.206.37/user/api/master/getmarketbytype?type='+type,{'headers':headers}).subscribe((res:any) => {
      this.markets = res.response;
      console.log(this.markets);
    })
  }

  getcryptograph(abbv:string,id:number) {
    this.market_names.push(abbv);
    
      this.bet.view_timers(id).subscribe((res) => {
        console.log(res);
        this.timers = res.response[0].payouts;
        
      })
      var history = [];
      var arr1 = [];
      var dataCount;
      this.http.get(`https://api.polygon.io/v2/aggs/ticker/${abbv}/range/1/minute/2021-10-26/2021-10-26?adjusted=true&sort=asc&apiKey=ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6`)
      .subscribe((data)=>{
        history.push(data);
        for(var i=0;i<history[0].results.length;i++){
          arr1.push(history[0].results[i].c)
        }
      })
      const subject = webSocket("wss://ws.finnhub.io?token=c5g1l4qad3i9cg8uch10");
      //subject.next({ action: "auth", params: "ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6" });
      subject.next({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'});
      var val;
      subject.subscribe((data)=>{
        
        if(data!=undefined){
          var data = data['data'];
          val = data;
          this.socketData = [];
          this.socketData.push(data);
          for(var i=0;i<val.length;i++){
            arr1.push(val[i].p);
          }
        }
      })
      const socket = new WebSocket('wss://socket.polygon.io/crypto');
      var val;
      var dataPoints = [], currentDate = new Date(), rangeChangedTriggered = false, dataPoints1 = [];

      var stockChart = new CanvasJS.StockChart("chartContainer", {
        theme: "dark1", //"light2", "dark1", "dark2"
        
        exportEnabled: false,
        rangeChanged: function (e) {
          rangeChangedTriggered = true;
        },
        charts: [{
          backgroundColor: "#172331",
          height: 750,
          toolTip: {
            shared: true,
            content: "{name}: ${y}"
          },
          axisX: {
            gridThickness: 0.15,
            gridColor: "grey",
            labelFontSize: 15,
            labelFontColor:"#ccc",
            labelAutoFit: true,
            valueFormatString: "HH:mm:s",
            stripLines: [{
              showOnTop: true,
              lineDashType: "dash",
              color: "#fff",
              labelFontColor: "#fff",
              labelFontSize: 15,
              thickness: 0.5
            }],
          },
          axisY2: {
            valueFormatString: "###.0000",
            gridThickness: 0.15,
            gridColor: "grey",
            labelFontSize: 15,
            labelFontColor:"#ccc",
            labelAutoFit: true,
            stripLines: [{
              showOnTop: true,
              thickness: 0.25,
              lineDashType: "solid",
              color: "#fff",
              labelFontColor: "black",
              labelFontSize: 15,
              labelPlacement: "outside",
              cornerRadius: 30
            }],
          },
          data: [
            {
              axisYType: "secondary",
              type: "area",
              name: "price",
              xValueFormatString: "MM DD, YYYY HH:mm:ss",
              xValueType: "dateTime",
              dataPoints: dataPoints,
              color: "#16293c",
              lineColor: "#33a9ff",
            },
            {
              axisYType: "secondary",
              type: "line",
              dataPoints: dataPoints1,
              xValueFormatString: "MM DD, YYYY HH:mm:ss",
              xValueType: "dateTime",
              lineThickness: 1,
              lineColor: "#fff",
              markerSize: 0
            }
          ]
        }],
        navigator: {
          slider: {
            minimum: new Date(currentDate.getTime() - (90 * 1000))
          },
          axisX: {
            labelFontColor: "white"
          }
        },
        rangeSelector: {
          enabled: false
        }
      });


     
      setTimeout(() => {
        var dataCount, y2start = arr1[0], interval = 1000, xstart = val[0].t - (16 * 60 * 1000);
        dataCount = history[0].results.length;
        updateChart(xstart, y2start, dataCount, interval);
      }, 5000);
      function updateChart(xstart, y2start, length, interval) {
        var xVal = xstart, yVal = y2start;
        for (var i = 0; i < length; i++) {
          if (length == 1) {
            yVal = arr1[arr1.length - 1];
          }
          else {
            yVal = arr1[i];
          }
          dataPoints.push({ x: xVal, y: yVal });
          xVal += interval;
        }

        if (!rangeChangedTriggered) {
          stockChart.options.navigator.slider.minimum = new Date(xVal - (90 * 1000));
          stockChart.options.navigator.slider.maximum = new Date(xVal + (90 * 1000));
        }
        stockChart.options.charts[0].axisY2.stripLines[0].value = dataPoints[dataPoints.length - 1].y;
        console.log(stockChart.options.charts[0].axisY2.stripLines[0]["value"].toString().substring(stockChart.options.charts[0].axisY2.stripLines[0]["value"].toString().indexOf('.')+1).split(''));
        
        if(stockChart.options.charts[0].axisY2.stripLines[0]["value"]%1!=0){
          var striplength = stockChart.options.charts[0].axisY2.stripLines[0]["value"].toString().split('.')[1].length
          if(striplength<=4){
            if(striplength==1){
              stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"]+"000";
            }
            else if(striplength==2){
              stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"]+"00";
            }
            else if(striplength==3){
              stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"]+"0";
            }
            else if(striplength==4){
              stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"];
            }
          }
          else{
            var append = stockChart.options.charts[0].axisY2.stripLines[0]["value"].toString().substring(stockChart.options.charts[0].axisY2.stripLines[0]["value"].toString().indexOf('.')+1).split('')
            var before = stockChart.options.charts[0].axisY2.stripLines[0]["value"].toString().split('.')[0];
            console.log(append);
            console.log(before);
            
            stockChart.options.charts[0].axisY2.stripLines[0].label = before+'.'+append[0]+append[1]+append[2]+append[3];

          }
        }
        else{
          stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"]+".0000";
        }
        sessionStorage.setItem('time', dataPoints[dataPoints.length - 1].x);
        stockChart.options.charts[0].axisX.stripLines[0].value = dataPoints[dataPoints.length - 1].x;
        
        xstart = xVal;
        dataCount = 1;
        y2start = yVal;
        var obj = dataPoints[dataPoints.length - 1];
        var obj1 = dataPoints[dataPoints.length - 2];
        if (obj.y != undefined) {
        }
        if (obj1.y != undefined) {
          obj1.indexLabel = "";
        }
        stockChart.render();
        var datapoints4length = stockChart.options.charts[0].data[0].dataPoints.length;
        for (var i = 1; i < datapoints4length; i++) {
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 2].markerSize = 0;
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 1].markerColor = "white";
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 1].markerType = "circle";
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 1].markerSize = 5;
        }
        stockChart.render();
        stockChart.navigator.axisX[0].set("maximum", new Date(xVal + (10 * 1000)));
        
        var max = Math.max(...arr1);
        var max_trunc = Math.trunc(max) + 10;
        var min_trunc = Math.trunc(dataPoints[dataPoints.length - 1].y);

       

        setTimeout(function () {
          setTimeout(function () {
            updateChart(xstart, y2start, dataCount, interval)
          })

          lineChart()
        }, 1000);
      }

      function lineChart() {
        var t = +sessionStorage.getItem('time');
        dataPoints1.push({ x: t+1000, y: val[val.length - 1].p }, { x: t + 120000, y: val[val.length - 1].p });
        dataPoints1 = dataPoints1.reverse();
        dataPoints1.length = 2;
      }
    // })

  }

  getcryptograph1(abbv: any) {
    $(document).ready(function () {
      var history = [];
      var arr1 = [];
      var dataCount;
      fetch('https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/minute/2021-10-26/2021-10-26?adjusted=true&sort=asc&apiKey=ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6')
        .then(response => response.json())
        .then((data) => {
          history.push(data);
          console.log('history', history[0].results);
          for (var i = 0; i < history[0].results.length; i++) {
            arr1.push(history[0].results[i].c);
          }
        });
      const socket = new WebSocket('wss://socket.polygon.io/crypto');

      var val;
      
      socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ action: "auth", params: "ju5mjYL3pwvojO1DjYV3zxdFXUxuHtx6" }));
        socket.send(JSON.stringify({ action: "subscribe", params: "XT.BTC-USD" }));
        
      });

      
      socket.addEventListener('message', function (event) {
        
        if (event.data != undefined) {
          var data = JSON.parse(event.data);
          val = data;
          
          for (var i = 0; i < val.length; i++) {
            arr1.push(val[i].p)
          }
        }
        console.log(val);
      });
      
      var unsubscribe = function (symbol) {
        socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
      }
      var dataPoints = [], currentDate = new Date(), rangeChangedTriggered = false, dataPoints1 = [];

      var stockChart = new CanvasJS.StockChart("chartContainer", {
        theme: "dark1", //"light2", "dark1", "dark2"
        title: {
          text: "BTC-USD"
        },

        rangeChanged: function (e) {
          rangeChangedTriggered = true;
        },
        charts: [{
          backgroundColor: "#172331",
          height: 600,
          toolTip: {
            shared: true,
            content: "{name}: ${y}"
          },
          axisX: {
            gridThickness: 0.15,
            gridColor: "grey",
            interval: 15,
            intervalType: 'second',
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
              thickness: 0.25,
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
              dataPoints: dataPoints,
              color: "#16293c",
              lineColor: "#33a9ff"
            },
            {
              axisYType: "secondary",
              type: "line",
              dataPoints: dataPoints1,
              xValueFormatString: "MM DD, YYYY HH:mm:ss",
              xValueType: "dateTime",
              lineThickness: 1,
              lineColor: "#fff",
              markerSize: 0
            }
          ]
        }],
        navigator: {
          slider: {
            minimum: new Date(currentDate.getTime() - (90 * 1000))
          },
          axisX: {
            labelFontColor: "white"
          }
        },
        rangeSelector: {
          enabled: false
        }
      });


     
      setTimeout(() => {
        var dataCount, y2start = arr1[0], interval = 340, xstart = val[0].t - (4 * 60 * 1000);
        dataCount = history[0].results.length;
        updateChart(xstart, y2start, dataCount, interval);
      }, 5000);
      function updateChart(xstart, y2start, length, interval) {
        var xVal = xstart, yVal = y2start;
        for (var i = 0; i < length; i++) {
          if (length == 1) {
            yVal = arr1[arr1.length - 1];
          }
          else {
            yVal = arr1[i];
          }
          dataPoints.push({ x: xVal, y: yVal });
          xVal += interval;
        }

        if (!rangeChangedTriggered) {
          stockChart.options.navigator.slider.minimum = new Date(xVal - (90 * 1000));
          stockChart.options.navigator.slider.maximum = new Date(xVal + (90 * 1000));
        }
        stockChart.options.charts[0].axisY2.stripLines[0].value = dataPoints[dataPoints.length - 1].y;
        stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"];
        sessionStorage.setItem('time', dataPoints[dataPoints.length - 1].x);
        stockChart.options.charts[0].axisX.stripLines[0].value = dataPoints[dataPoints.length - 1].x;
        
        xstart = xVal;
        dataCount = 1;
        y2start = yVal;
        var obj = dataPoints[dataPoints.length - 1];
        var obj1 = dataPoints[dataPoints.length - 2];
        if (obj.y != undefined) {
        }
        if (obj1.y != undefined) {
          obj1.indexLabel = "";
        }
        stockChart.render();
        var datapoints4length = stockChart.options.charts[0].data[0].dataPoints.length;
        for (var i = 1; i < datapoints4length; i++) {
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 2].markerSize = 0;
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 1].markerColor = "white";
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 1].markerType = "circle";
          stockChart.options.charts[0].data[0].dataPoints[dataPoints.length - 1].markerSize = 5;
        }
        stockChart.render();
        stockChart.navigator.axisX[0].set("maximum", new Date(xVal + (10 * 1000)));
        console.log(stockChart.navigator.axisX[0].get("intervalType"),
          stockChart.navigator.axisX[0].get("interval"), stockChart.navigator.axisX[0].get("minimum"));
        var max = Math.max(...arr1);
        var max_trunc = Math.trunc(max) + 10;
        var min_trunc = Math.trunc(dataPoints[dataPoints.length - 1].y);

        stockChart.charts[0].axisY2[0].set("interval",);

        setTimeout(function () {
          setTimeout(function () {
            updateChart(xstart, y2start, dataCount, interval)
          })

          lineChart()
        }, 250);
      }

      function lineChart() {
        var t = +sessionStorage.getItem('time');
        dataPoints1.push({ x: t + 340, y: val[val.length - 1].p }, { x: t + 120000, y: val[val.length - 1].p });
        dataPoints1 = dataPoints1.reverse();
        dataPoints1.length = 2;
      }
    })

  }

}
