class Chart2{

    constructor(){

        this.data = [];
        this.time = [];
        this.dataLabel2 = [];
        this.gpuType2 = [];
        this.gpuPrice2 = [];
        this.dropdown2 = ["3060tiButton2", "3070Button2", "3080Button2", "3090Button2"];
        this.historyURL = "https://deedoodle.com/API_Scoreboard/webapi/gpu_resource/allgpu/fromtoday/";
        this.historyURLToday = "https://deedoodle.com/API_Scoreboard/webapi/gpu_resource/allgpu/date/";
        this.gpuTier2 = "3070"

        this.boolToday = true;
        this.bool1Week = false;
        this.bool1Month = false;
        this.bool6Month = false;
        this.bool1Year = false;

        this.savedTimeLength;
        this.savedAxisLevelWidth;

        this.stackedLine;
        this.xAxisLabelMinWidth = 150;
    }

    init(){

        console.log("Chart2 Initialized..");

        //  Create chart2
        this.createChart();

        //  Init all of the toggle buttons with listeners

        //  3060ti History Button init
        this.button3060ti = document.getElementById("3060tiButton2");
        if(this.button3060ti.addEventListener){

            this.button3060ti.addEventListener("click", () => this.changeGPU("3060tiButton2"));
        }else {

            console.log("Add Event Error for 3060tiButton2.");
        }

        //  3070 History Button init
        this.button3070 = document.getElementById("3070Button2");
        if(this.button3070.addEventListener){

            this.button3070.addEventListener("click", () => this.changeGPU("3070Button2"));
        }else {

            console.log("Add Event Error for 3070Button2.");
        }

        //  3080 History Button init
        this.button3080 = document.getElementById("3080Button2");
        if(this.button3080.addEventListener){

            this.button3080.addEventListener("click", () => this.changeGPU("3080Button2"));
        }else {

            console.log("Add Event Error for 3080Button2.");
        }

        //  3090 History Button init
        this.button3090 = document.getElementById("3090Button2");
        if(this.button3090.addEventListener){

            this.button3090.addEventListener("click", () => this.changeGPU("3090Button2"));
        }else {

            console.log("Add Event Error for 3090Button2.");
        }

        //  Today button Init
        this.todayButton = document.getElementById("1dayButton");
        if(this.todayButton.addEventListener){

            this.todayButton.addEventListener("click", () => this.toggleToday(24, 120), false);
        }else {

            console.log("Add Event Error for Button.");
        }

        //  1 Week button Init
        this.week1Button = document.getElementById("1weekButton");
        if(this.week1Button.addEventListener){

            this.week1Button.addEventListener("click", () => this.toggleTimeDataButton(7, 130), false);
        }else {

            console.log("Add Event Error for Button.");
        }

        //  1 Month button Init
        this.month1Button = document.getElementById("1monthButton");
        if(this.month1Button.addEventListener){

            this.month1Button.addEventListener("click", () => this.toggleTimeDataButton(30, 90), false);
        }else {

            console.log("Add Event Error for Button.");
        }

        //  6 Months button Init
        this.month6Button = document.getElementById("6monthButton");
        if(this.month6Button.addEventListener){

            this.month6Button.addEventListener("click", () => this.toggleTimeDataButton(180, 18), false);
        }else {

            console.log("Add Event Error for Button.");
        }

        //  1 Year button Init
        this.year1Button = document.getElementById("1yearButton");
        if(this.year1Button.addEventListener){

            this.year1Button.addEventListener("click", () => this.toggleTimeDataButton(365, 18), false);
        }else {

            console.log("Add Event Error for Button.");
        }
    }

    changeGPU(tier){

        for(let i = 0; i < this.dropdown2.length; i++){

            document.getElementById(this.dropdown2[i]).style.display = "block";
        }

        let newSelected = document.getElementById(tier).innerHTML;
        document.getElementById("dropdown2").value = newSelected;
        document.getElementById(tier).style.display = "none";
        this.gpuTier2 = newSelected;
        this.toggleTimeDataButton(this.savedTimeLength, this.savedAxisLevelWidth);
    }

    createChart(){

        console.log("Creating chart 2...");

        var ctx = document.getElementById('chart2');
        this.stackedLine = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.time,
                datasets: [{
                    data: this.data,
                    beforeBody: this.gpuPrice2,
                    beforeLabel: this.gpuType2,
                    label: this.dataLabel2,
                    borderColor: "#ff3434",
                    pointBackgroundColor: "#1b1d1d",
                    fill: true
                }]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        // beforeBody: function(tooltipItems, data){

                        //     return "Type: " + data['datasets'][0]['beforeBody'][tooltipItems['index']];
                        // },
                        beforeLabel: function(tooltipItems, data){

                            var lineBreak = ["Type: " + data['datasets'][0]['beforeLabel'][tooltipItems['index']]];

                            lineBreak.push("Price: " + data['datasets'][0]['beforeBody'][tooltipItems['index']]);

                            return lineBreak;

                            // return "Price: " + data['datasets'][0]['beforeLabel'][tooltipItems['index']];
                        },
                        label: function(tooltipItems, data){

                            if(data['datasets'][0]['data'][tooltipItems['index']] <= 0){

                                return "Drops: 0";

                            }else{

                                return "Drops: " + data['datasets'][0]['data'][tooltipItems['index']];
                            }
                        },
                        afterLabel: function(tooltipItems, data) {
                            return "Tier: " + data['datasets'][0]['label'][tooltipItems['index']];
                        }
                    },
                    backgroundColor: '#1b1d1d',
                    titleFontSize: 14,
                    titleFontColor: '#a0a3a0',
                    //labelTextColor: '#ff2424',
                    bodyFontColor: '#ff3434',
                    bodyFontSize: 14,
                    displayColors: false
                },
                hover: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    yAxes: [{
                        stacked: true,
                        position: "right",
                        ticks: {
                            min: 0,
                            fontColor: "#a0a3a0",
                            padding: 10
                        },
                        gridLines: {
                            color: "#292929"
                          }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "#a0a3a0"
                        }
                    }]
                },
                title: {
                    display: false,
                    text: "Chart2"
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 20,
                        right: 10,
                        left: 15
                    }
                }
                // elements: {      // Creates straight lines
                //     line: {
                //         tension: 0
                //     }
                // }
            }
        });
    }

    updateChart(axisMinimum){

        //  expand the chart using overflow from div
        var chartCanvas = document.getElementById('chart2');
        var maxWidth = chartCanvas.parentElement.parentElement.clientWidth;
        var width = Math.max(this.stackedLine.data.labels.length * axisMinimum, maxWidth);
        chartCanvas.parentElement.style.width = width + "px";
        //this.stackedLine.update();
        this.createChart();

        //  Keeps the scroll bar to the right when date buttons clicked
        var divScroll = document.getElementById('chart2WrapperID');
            divScroll.scrollLeft = divScroll.scrollWidth;
    }

    /**
     * 
     * @param {*} dataArray 
     * 
     * Reverses the given array, used to display data in reverse on chart
     * 
     */
    reverseDataArray(dataArray){

        let tempArray = [];

        for(let i = dataArray.length - 1; i >= 0; i--){

            tempArray[i] = dataArray[parseInt((dataArray.length - 1) - i)];
        }

        return tempArray;
    }

    draw(){

    }

    //  Toggles the today button
    toggleToday(timeLength, axisLabelWidth){

        //  Clear the data from the array
        this.data.splice(0, this.data.length);
        this.time.splice(0, this.time.length);
        this.dataLabel2.splice(0, this.dataLabel2.length);
        this.gpuType2.splice(0, this.gpuType2.length);
        this.gpuPrice2.splice(0, this.gpuPrice2.length);

        //  Temp arrays to hold data, will be used to reverse arrays
        let tempData = [];
        let tempTime = [];
        let tempGpuType = [];
        let tempGpuPrice = [];

        //  push the full 24 hours in a day to the time array
        for(let i = 0; i < 25; i++){

            if(i < 10){

                tempTime.push("0" + i + ":00:00");

            }else{

                tempTime.push(i + ":00:00");
            }
        }

        let today = new Date();
        let fromToday = new Date();

        today = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1).toString()).slice(-2)
            + "-" + ("0" + today.getDate().toString().slice(-2));

        fromToday.setDate(fromToday.getDate() - timeLength);

        fromToday = fromToday.getFullYear() + "-" + ("0" + (fromToday.getMonth() + 1).toString()).slice(-2)
            + "-" + ("0" + fromToday.getDate().toString().slice(-2));
        
        //  Connect to api to pass data to chart
        let conn = new HttpConnection();
        //  Pass today's date
        conn.connect(this.historyURLToday + today + "&" + this.gpuTier2, false);
        let gpuArray = conn.getAmountDropped();

        for(let i = 0; i < tempTime.length; i++){

            //  Array to store array of gpu types and prices for tooltips box
            let tempGpuTypeArray = [];
            let tempGpuPriceArray = [];

            let numberOfDrops = 0;

            for(let j = 0; j < gpuArray.length; j++){

                let ourTime = tempTime[i].substring(0, 2);
                let theirTime = gpuArray[j].time_start.substring(0, 2);

                if(theirTime == ourTime){

                    let canPush = true;

                    numberOfDrops++;

                    tempData[i] = numberOfDrops;

                    if(tempGpuTypeArray.length <= 0){

                        tempGpuTypeArray.push(gpuArray[j].type);
                        tempGpuPriceArray.push(gpuArray[j].price);
                        canPush = false;

                    }else{

                        for(let k = 0; k < tempGpuTypeArray.length; k++){

                            //  Check for duplicates
                            if(tempGpuTypeArray[k] == gpuArray[j].type){

                                canPush = false;
                                k = tempGpuTypeArray.length;
                            }
                        }
                    }

                    if(canPush){

                        tempGpuTypeArray.push(gpuArray[j].type);
                        tempGpuPriceArray.push(gpuArray[j].price);
                    }
                }

                tempGpuPriceArray.push(gpuArray[j].price);
                tempGpuTypeArray.push(gpuArray[j].type);
            }

            tempData.push(numberOfDrops);
            tempGpuPrice.push(tempGpuPriceArray);
            tempGpuType.push(tempGpuTypeArray);
            this.dataLabel2.push(this.gpuTier2);
        }


        //  Function to reverse the arrays so they display from right to left in chart
        for(let i = 0; i < this.reverseDataArray(tempTime).length; i++){

            this.time.push(this.reverseDataArray(tempTime)[i]);
            this.data.push(this.reverseDataArray(tempData)[i]);
            this.gpuType2.push(this.reverseDataArray(tempGpuType)[i]);
            this.gpuPrice2.push(this.reverseDataArray(tempGpuPrice)[i]);
            this.dataLabel2.push(this.gpuTier2);
        }

        this.updateChart(axisLabelWidth);
    }

    //  Toggles the 1 Week button
    toggleTimeDataButton(timeLength, axisLabelWidth){

        this.savedTimeLength = timeLength;
        this.savedAxisLevelWidth = axisLabelWidth;

        //  Clear the data from the array
        this.data.splice(0, this.data.length);
        this.time.splice(0, this.time.length);
        this.dataLabel2.splice(0, this.dataLabel2.length);
        this.gpuType2.splice(0, this.gpuType2.length);
        this.gpuPrice2.splice(0, this.gpuPrice2.length);

        //  Temp arrays to hold data, will be used to reverse arrays
        let tempData = [];
        let tempTime = [];
        let tempGpuType = [];
        let tempGpuPrice = [];

        let today = new Date();
        let fromToday = new Date();

        today = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1).toString()).slice(-2)
            + "-" + ("0" + today.getDate().toString().slice(-2));

        fromToday.setDate(fromToday.getDate() - timeLength);

        fromToday = fromToday.getFullYear() + "-" + ("0" + (fromToday.getMonth() + 1).toString()).slice(-2)
            + "-" + ("0" + fromToday.getDate().toString().slice(-2));

        //  Connect to api to pass data to chart
        let conn = new HttpConnection();
        //  Pass today's date
        conn.connect(this.historyURL + today + "&" + fromToday + "&" + this.gpuTier2, false);
        let gpuArray = conn.getAmountDropped();

        let numberOfDrops;

        for(let i = 0; i < timeLength; i++){

            //  Array to store array of gpu types and prices for tooltips box
            let tempGpuTypeArray = [];
            let tempGpuPriceArray = [];

            //  decrements from today to the end of loop giving all days in between
            let dateFromToday = new Date();
            dateFromToday.setDate(dateFromToday.getDate() - i);
            
            //  Reset the number of drops to 0 for every loop and set data to 0 as default
            //  and set the date of current day in the loop
            numberOfDrops = 0;
            tempData[i] = numberOfDrops;

            //  slice variables
            let scliceMonth = ("0" + parseInt(dateFromToday.getMonth() + 1)).toString();
            let sliceDay = ("0" + dateFromToday.getDate().toString());

            //  slicing the variables, this will make sure there is a 0 infront of the date
            //  number or will remove a 0 is there is one to many
            scliceMonth = scliceMonth.slice(-2);
            sliceDay = sliceDay.slice(-2);

            tempTime[i] = dateFromToday.getFullYear() + "-" 
                    + scliceMonth + "-" 
                    + sliceDay;

            for(let j = 0; j < gpuArray.length; j++){
                
                let stringDate = gpuArray[j].date_start;

                if(stringDate.toString() == tempTime[i].toString()){

                    let canPush = true;

                    numberOfDrops++;

                    tempData[i] = numberOfDrops;

                    if(tempGpuTypeArray.length <= 0){

                        tempGpuTypeArray.push(gpuArray[j].type);
                        tempGpuPriceArray.push(gpuArray[j].price);
                        canPush = false;

                    }else{

                        for(let k = 0; k < tempGpuTypeArray.length; k++){

                            //  Check for duplicates
                            if(tempGpuTypeArray[k] == gpuArray[j].type){

                                canPush = false;
                                k = tempGpuTypeArray.length;
                            }
                        }
                    }

                    if(canPush){

                        tempGpuTypeArray.push(gpuArray[j].type);
                        tempGpuPriceArray.push(gpuArray[j].price);
                    }
                }

                tempData[i] = numberOfDrops;
            }

            tempGpuType.push(tempGpuTypeArray);
            tempGpuPrice.push(tempGpuPriceArray);
        }

        //  add reversed values to the data array  |  Also update the tier
        // for(let i = 0; i < this.reverseDataArray(tempData).length; i++){

        //     this.data.push(this.reverseDataArray(tempData)[i]);
        //     this.dataLabel2.push(this.gpuTier2);
        // }

        //  Function to reverse the arrays so they display from right to left in chart
        for(let i = 0; i < this.reverseDataArray(tempTime).length; i++){

            this.time.push(this.reverseDataArray(tempTime)[i]);
            this.data.push(this.reverseDataArray(tempData)[i]);
            this.gpuType2.push(this.reverseDataArray(tempGpuType)[i]);
            this.gpuPrice2.push(this.reverseDataArray(tempGpuPrice)[i]);
            this.dataLabel2.push(this.gpuTier2);
        }

        //  Pass the custom axis minimum label width
        this.updateChart(axisLabelWidth);
    }
}