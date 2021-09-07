class Chart1{

    constructor(){

        this.data = [];
        this.time = [];
        this.dataLabel = [];
        this.gpuType1 = [];
        this.gpuPrice1 = [];
        this.dropdown1 = ["3060tiButton1", "3070Button1", "3080Button1", "3090Button1"];
        this.lineColor = "#ff3434";
        this.scannerURL = "https://deedoodle.com/API_Scoreboard/webapi/gpu_resource/allgpu/date/";
        this.gpuTier1 = "3070";
        
        this.boolScanner = false;
        this.scannerOpacity = 0.0;
    }

    init(){

        console.log("Chart1 Initialized..");

        //  3060ti Scanner Button init
        this.button3060ti = document.getElementById("3060tiButton1");
        if(this.button3060ti.addEventListener){

            this.button3060ti.addEventListener("click", () => this.changeGPU("3060tiButton1"));
        }else {

            console.log("Add Event Error for 3060tiButton1.");
        }

        //  3070 Scanner Button init
        this.button3070 = document.getElementById("3070Button1");
        if(this.button3070.addEventListener){

            this.button3070.addEventListener("click", () => this.changeGPU("3070Button1"));
        }else {

            console.log("Add Event Error for 3070Button1.");
        }

        //  3080 Scanner Button init
        this.button3080 = document.getElementById("3080Button1");
        if(this.button3080.addEventListener){

            this.button3080.addEventListener("click", () => this.changeGPU("3080Button1"));
        }else {

            console.log("Add Event Error for 3080Button1.");
        }

        //  3090 Scanner Button init
        this.button3090 = document.getElementById("3090Button1");
        if(this.button3090.addEventListener){

            this.button3090.addEventListener("click", () => this.changeGPU("3090Button1"));
        }else {

            console.log("Add Event Error for 3090Button1.");
        }

        //  Update values in table
        this.updateChart();
    }

    changeGPU(tier){

        for(let i = 0; i < this.dropdown1.length; i++){

            document.getElementById(this.dropdown1[i]).style.display = "block";
        }

        let newSelected = document.getElementById(tier).innerHTML;
        document.getElementById("dropdown1").value = newSelected;
        document.getElementById(tier).style.display = "none";
        document.getElementById("scanningText").innerHTML = "Scanning for " + newSelected;
        this.gpuTier1 = newSelected;
    }

    updateChart(){

        var xAxisLabelMinWidth = 110;
        var ctx = document.getElementById('chart1');
        var stackedLine = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.time,
                datasets: [{
                    data: this.data,
                    beforeBody: this.gpuPrice1,
                    beforeLabel: this.gpuType1,
                    label: this.dataLabel,
                    borderColor: this.lineColor,
                    pointBackgroundColor: "#1b1d1d",
                    fill: true
                }]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        beforeLabel: function(tooltipItems, data){

                            // return "Type: " + data['datasets'][0]['beforeLabel'][tooltipItems['index']];

                            var lineBreak = ["Type: " + data['datasets'][0]['beforeLabel'][tooltipItems['index']]];

                            lineBreak.push("Price: " + data['datasets'][0]['beforeBody'][tooltipItems['index']]);

                            return lineBreak;
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
                    text: "Chart1"
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
            }
        });

        this.updateFunc = setInterval(() => {

            //  Once charts have 80 inserts, remove the oldest one. index[0]
            if(this.data.length >= 80){

                this.data.splice(0,1);
                this.time.splice(0,1);
                this.dataLabel.splice(0,1);
                this.gpuPrice1.splice(0,1);
                this.gpuType1.splice(0,1);
            }

            let date = new Date();
            this.time.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

            //  Get Todays date to be used to fish data from api
            let todayDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1).toString()).slice(-2)
            + "-" + ("0" + date.getDate().toString().slice(-2));

            //  Connect to api to pass data to chart
            let conn = new HttpConnection();
            //  Pass today's date
            conn.connect(this.scannerURL + todayDate + "&" + this.gpuTier1, false);
            let gpuArray = conn.getAmountDropped();

            let activeGPUCount = 0;
            let tempGpuArray = [];
            let tempGpuPriceArray = [];

            if(gpuArray.length <= 0){

                stackedLine.data.datasets[0].borderColor = this.lineColor;
            }

            for(let i = 0; i < gpuArray.length; i++){

                if(gpuArray[i].time_end == null){

                    activeGPUCount++;
                    stackedLine.data.datasets[0].borderColor = "#24ff5b";

                    tempGpuArray.push(gpuArray[i].type);
                    tempGpuPriceArray.push(gpuArray[i].price);

                }else{

                    stackedLine.data.datasets[0].borderColor = this.lineColor;
                }
            }

            this.gpuPrice1.push(tempGpuPriceArray);
            this.gpuType1.push(tempGpuArray);
            this.data.push(activeGPUCount);
            this.dataLabel.push(this.gpuTier1);

            stackedLine.update();

            //  expand the chart using overflow from div
            var chartCanvas = document.getElementById('chart1');
            var maxWidth = chartCanvas.parentElement.parentElement.clientWidth;
            var width = Math.max(stackedLine.data.labels.length * xAxisLabelMinWidth, maxWidth);
            chartCanvas.parentElement.style.width = width + "px";

            //  Makes scroll bar stick with the new data
            var divScroll = document.getElementById('chart1WrapperID');
            divScroll.scrollLeft = divScroll.scrollWidth;

        }, 8000);
    }

    draw(){

        if(this.scannerOpacity <= 0.0){

            this.boolScanner = true;

        }else if(this.scannerOpacity >= 1.0){

            this.boolScanner = false;
        }

        if(this.boolScanner){

            this.scannerOpacity += 0.01

        }else if(!this.boolScanner){

            this.scannerOpacity -= 0.01;
        }

        document.getElementById("scanningText").style.opacity = this.scannerOpacity;
    }
}