class Menu{

    constructor(){

    }

    init(){
        
        this.chart1 = new Chart1();
        this.chart1.init();

        this.chart2 = new Chart2();
        this.chart2.init();

        this.fadeOpacity = 1.0;
    }

    draw(){

        if(this.fadeOpacity >= 0.0){

            this.fadeOpacity -= 0.02;
            document.getElementById("translateBox").style.opacity = this.fadeOpacity;

        }else if(this.fadeOpacity <= 0.0){

            document.getElementById("div1Wrapper").style.zIndex = 0;
            document.getElementById("div2Wrapper").style.zIndex = 0;
        }

        this.chart1.draw();
    }
}