class HttpConnection{

    constructor(){

        this.isReady = false;
    }


    connect(url, asyncBool){
        
        let context = this;

        let xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                context.objectArray = JSON.parse(this.responseText);
                context.isReady = true;
            }
        };

        xmlHttp.open("GET", url, asyncBool);
        xmlHttp.send();
    }

    getAmountDropped(){

        this.isReady = false;

        return this.objectArray;
    }

    getIsReady(){

        return this.isReady;
    }

    connectPost(url, asyncBool, object){

        let xmlHttp = new XMLHttpRequest();

        xmlHttp.open("POST", url, asyncBool);
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlHttp.setRequestHeader('x-Requested-With', 'xmlhttprequest');
        xmlHttp.send(JSON.stringify(object));
    }
}