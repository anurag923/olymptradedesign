import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { webSocket } from "rxjs/webSocket";
declare const CanvasJS: any;
@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.page.html',
  styleUrls: ['./iframe.page.scss'],
})
export class IframePage implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      var history = [];
      var arr1 = [];
      var dataCount;
      fetch('https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/minute/2021-10-27/2021-10-27?adjusted=true&sort=asc&apiKey=6sEFcNe2upitHW5lt9dp7EfkIuxoR58k')
      .then(response => response.json())
      .then((data) => {
        history.push(data);
        console.log('history',history[0].results);
        for(var i=0;i<history[0].results.length;i++){
          arr1.push(history[0].results[i].c);
        }
        //console.log(arr1);
      });
      const socket = new WebSocket('wss://socket.polygon.io/crypto');
      //const socket = new WebSocket('wss://ws.finnhub.io?token=c5g1l4qad3i9cg8uch10');
      var val;
      // Connection opened -> Subscribe
      socket.addEventListener('open', function (event) {
          socket.send(JSON.stringify({action:"auth",params:"6sEFcNe2upitHW5lt9dp7EfkIuxoR58k"}));
          socket.send(JSON.stringify({action:"subscribe",params:"XT.BTC-USD"}));
          //socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'COINBASE:BTC-USD'}))
      });

      // Listen for messages
      socket.addEventListener('message', function (event) {
          //console.log('Message from server ', event.data);
          if(event.data!=undefined){
            var data = JSON.parse(event.data);
            val = data;
            //val = data['data'];
            for(var i=0;i<val.length;i++){
              arr1.push(val[i].p)
            }
          }
          console.log(val);
      });
      // Unsubscribe
      var unsubscribe = function(symbol) {
          socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
      }
      var dataPoints = [], currentDate = new Date(), rangeChangedTriggered = false , dataPoints1 = [];

      var stockChart = new CanvasJS.StockChart("chartContainer",{
        theme: "dark1", //"light2", "dark1", "dark2"
        title:{
          text:"BTC-USD"
        },
        
        rangeChanged: function(e) {
            rangeChangedTriggered = true;
        },
        charts: [{
          backgroundColor: "#172331",
          height:600,
          toolTip:{
            shared: true,
            content: "{name}: ${y}"
          },
          axisX: {
            gridThickness: 0.15,
            gridColor: "grey",
            interval : 15,
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
            dataPoints : dataPoints,
            color:"#16293c",
            lineColor: "#33a9ff",
          },
          {
            axisYType: "secondary",
            type:"line",
            dataPoints:dataPoints1,
            xValueFormatString: "MM DD, YYYY HH:mm:ss",
            xValueType: "dateTime",
            lineThickness: 1,
            lineColor : "#fff",
            markerSize : 0
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


      // var dataCount, y2start = arr1[0], interval = 340, xstart = val[0].t;
      setTimeout(()=>{
        var dataCount, y2start = arr1[0], interval = 340, xstart = val[0].t-(4*60*1000);
        dataCount = history[0].results.length;
        updateChart(xstart, y2start, dataCount, interval);
      },5000);
      function updateChart(xstart, y2start, length, interval) {
        var xVal = xstart, yVal = y2start;
        for(var i = 0; i < length; i++) {
          if(length==1){
            yVal = arr1[arr1.length-1];
          }
          else {
            yVal = arr1[i];
          }
          dataPoints.push({x: xVal,y: yVal}); 
          xVal += interval;
        }
      
        if(!rangeChangedTriggered) {
            stockChart.options.navigator.slider.minimum = new Date(xVal - (90 * 1000));
            stockChart.options.navigator.slider.maximum = new Date(xVal + (90 * 1000));
        }
        stockChart.options.charts[0].axisY2.stripLines[0].value =  dataPoints[dataPoints.length - 1].y;
        stockChart.options.charts[0].axisY2.stripLines[0].label = stockChart.options.charts[0].axisY2.stripLines[0]["value"];
        sessionStorage.setItem('time',dataPoints[dataPoints.length-1].x);
        stockChart.options.charts[0].axisX.stripLines[0].value = dataPoints[dataPoints.length - 1].x;
        //stockChart.options.charts[0].axisX.stripLines[0].label = "Beginning of trade";
        xstart = xVal;
        dataCount = 1;
        y2start = yVal;
        var obj = dataPoints[dataPoints.length-1];
        var obj1 = dataPoints[dataPoints.length-2];
        if(obj.y!=undefined){
        }
        if(obj1.y!=undefined){
          obj1.indexLabel = "";
        }
        stockChart.render();
        var datapoints4length = stockChart.options.charts[0].data[0].dataPoints.length;
        for (var i = 1; i < datapoints4length; i++) {
            stockChart.options.charts[0].data[0].dataPoints[dataPoints.length-2].markerSize = 0;
            stockChart.options.charts[0].data[0].dataPoints[dataPoints.length-1].markerColor = "white";
            stockChart.options.charts[0].data[0].dataPoints[dataPoints.length-1].markerType = "circle";
            stockChart.options.charts[0].data[0].dataPoints[dataPoints.length-1].markerSize = 5;
        }
        stockChart.render();
        stockChart.navigator.axisX[0].set("maximum",new Date(xVal + (10*1000)));
        console.log(stockChart.navigator.axisX[0].get("intervalType"),
        stockChart.navigator.axisX[0].get("interval"),stockChart.navigator.axisX[0].get("minimum"));
        var max = Math.max(...arr1);
        var max_trunc = Math.trunc(max)+10;
        var min_trunc = Math.trunc(dataPoints[dataPoints.length-1].y);

        //stockChart.charts[0].axisY2[0].set("interval",);

        setTimeout(function(){
          setTimeout(function(){
            updateChart(xstart,y2start,dataCount,interval)
          })

          lineChart()
        },250);
      }

      function lineChart(){
            var t = +sessionStorage.getItem('time');
            dataPoints1.push({x:t+340,y:val[val.length-1].p},{x:t+120000,y:val[val.length-1].p});
            dataPoints1 = dataPoints1.reverse();
            dataPoints1.length = 2;
      }
    })

  }

  test(){
    alert("hello");
  }

}
