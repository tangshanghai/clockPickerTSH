import html from "./template/Main.html";
import "./css/Main.css";
import Utils from "./Utils.js";
class Main{
    constructor(_callBack){
        this.root = document.createElement("div");
        this.root.innerHTML = html;
        this.root.className = "cp-app-tsh";

        this.primaryColor = {r:255,g:0,b:0};
        this.selectColor = {r:255,g:0,b:0};
        this.colorAlpha = 1;
        this.xScale = 0;
        this.yScale = 0;
        this.hexColor = "#FFFFFF";

        this.callBack = _callBack;

        this.ele_colorArea = this.root.querySelector(".cp-app-tsh .cp-color-area");
        this.ele_colorThumb = this.root.querySelector(".cp-app-tsh .cp-color-area .cp-color-thumb");
        this.ele_selectColor = this.root.querySelector(".cp-app-tsh .cp-select-color-dis");
        this.ele_primaryInput = this.root.querySelector(".cp-app-tsh .cp-primary-slider .cp-slider-tsh");
        this.ele_alphaInput = this.root.querySelector(".cp-app-tsh .cp-alpha-slider .cp-slider-tsh");
        this.ele_primaryIcon = this.root.querySelector(".cp-app-tsh .cp-primary-slider .cp-slider-thumb");
        this.ele_alphaIcon = this.root.querySelector(".cp-app-tsh .cp-alpha-slider .cp-slider-thumb");
        this.ele_alphaBg = this.root.querySelector(".cp-app-tsh .cp-alpha-slider .cp-slider-bg");
        this.ele_hexInput = this.root.querySelector(".cp-app-tsh .cp-hex-input");
        
        this.ele_selectColor.style.backgroundColor = "#FFFFFF";
        this.ele_alphaIcon.style.left = "100%";
        this.ele_hexInput.value = "#FFFFFF";

        this.ele_primaryInput.addEventListener("input",this.primaryChangeHandler);
        this.ele_alphaInput.addEventListener("input",this.alphaChangeHandler);
        this.ele_colorArea.addEventListener("mousedown",this.areadownHandler);
        this.ele_hexInput.addEventListener("change",this.hexChangeHandler);
    }

    //色带改变
    primaryChangeHandler = (event)=>{
        let v = event.target.value/100;
        this.ele_primaryIcon.style.left = event.target.value+"%";
        // let index = Math.floor(v/(1/6));
        // let temp = ~~((v%(1/6))/(1/6)*255);
        // let r=255,g=0,b=0;
        // switch(index){
        //     case 0:
        //         r=255;g=0;b=temp;
        //         break;
        //     case 1:
        //         r=(255-temp);g=0;b=255;
        //         break;
        //     case 2:
        //         r=0;g=temp;b=255;
        //         break;
        //     case 3:
        //         r=0;g=255;b=(255-temp);
        //         break;
        //     case 4:
        //         r=temp;g=255;b=0;
        //         break;
        //     case 5:
        //         r=255;g=(255-temp);b=0;
        //         break;
        // }
        let rgb = Utils.HSVTORGB(~~((1-v)*360),1,1);
        // console.log();
        // console.log(RGBTOHSV(r,g,b));
        this.primaryColor = Object.assign(rgb);
        this.ele_colorArea.style.backgroundImage = "linear-gradient(to right,#FFFFFF 0%,rgb("+rgb.r+","+rgb.g+","+rgb.b+") 100%)";
        
        this.operationColor();
    }

    //透明度改变
    alphaChangeHandler = (event) =>{
        let v = event.target.value;

        this.ele_alphaIcon.style.left = v+"%";
        this.colorAlpha = v/100;
        this.operationColor();
    }

    //按下并移动
    areadownHandler = (event) =>{
        let e = event ? event : window.event;
        e.preventDefault();
        
        let areaW = this.ele_colorArea.offsetWidth;
        let areaH = this.ele_colorArea.offsetHeight;
        let pos = this.ele_colorArea.getBoundingClientRect();
    
        let self = this;
        updateIconPosition(e.offsetX,e.offsetY);
        document.addEventListener("mousemove",areaMouseMoveHandler);
        document.addEventListener("mouseup",areaMouseUpHandler);

        function areaMouseMoveHandler(event){
            let e = event ? event : window.event;
            e.preventDefault();
            updateIconPosition(e.clientX-pos.left,e.clientY-pos.top);
        }

        function areaMouseUpHandler(event){
            let e = event ? event : window.event;
            e.preventDefault();
            document.removeEventListener("mousemove",areaMouseMoveHandler);
            document.removeEventListener("mouseup",areaMouseUpHandler);
        }

        function updateIconPosition(ofx,ofy){
            let xf = ofx/areaW;
            let yf = ofy/areaH;
            if(xf < 0) xf = 0;
            if(xf > 1) xf = 1;
            if(yf < 0) yf = 0;
            if(yf > 1) yf = 1;
            xf = ~~(xf*100)/100;
            yf = ~~(yf*100)/100;
            self.ele_colorThumb.style.left = ~~(xf*100)+"%";
            self.ele_colorThumb.style.top = ~~(yf*100)+"%";

            self.xScale = xf;
            self.yScale = yf;
            self.operationColor();
        }
    }

    //hex输入事件
    hexChangeHandler = () =>{
        let v = this.ele_hexInput.value;
        // if(v.length < 6) return;
        let _v = v.replace("#","");
        if(_v.length != 6) return;
        if(isNaN(parseInt("0x"+_v))) return;
        if(v.indexOf("#") == -1) v = "#"+v;
        this.setColor(v,this.colorAlpha);
        // console.log(this.ele_hexInput.value);
        if(this.callBack){
            this.callBack(this.getColor());
        }
    }

    operationColor(){
        let hsv = Utils.RGBTOHSV(this.primaryColor.r,this.primaryColor.g,this.primaryColor.b);
        hsv.s = (this.xScale);
        let sc = Utils.HSVTORGB(hsv.h,hsv.s,hsv.v);
        sc.r = ~~(sc.r*(1-this.yScale));
        sc.g = ~~(sc.g*(1-this.yScale));
        sc.b = ~~(sc.b*(1-this.yScale));
        
        this.selectColor = sc;
        this.hexColor = Utils.RGBTOHEX(sc.r,sc.g,sc.b);
        // this.ele_selectColor.style.backgroundColor = this.hexColor;
        // this.ele_selectColor.style.opacity = this.colorAlpha;
        this.ele_selectColor.style.backgroundColor = "rgba("+sc.r+","+sc.g+","+sc.b+","+this.colorAlpha+")";
        this.ele_alphaBg.style.backgroundImage = "linear-gradient(to right,rgba("+sc.r+","+sc.g+","+sc.b+",0) 0%,rgb("+sc.r+","+sc.g+","+sc.b+") 100%)";
        this.ele_hexInput.value = this.hexColor;

        if(this.callBack){
            this.callBack(this.getColor());
        }
    }

    setColor(_hex,_a){
        let sc = Utils.HEXTORGB(_hex);
        let a = _a;
        if(a < 0) a = 0;
        if(a > 1) a = 1;
        
        this.ele_selectColor.style.backgroundColor = "rgba("+sc.r+","+sc.g+","+sc.b+","+a+")";
        this.ele_alphaBg.style.backgroundImage = "linear-gradient(to right,rgba("+sc.r+","+sc.g+","+sc.b+",0) 0%,rgb("+sc.r+","+sc.g+","+sc.b+") 100%)";
        this.ele_hexInput.value = _hex.toLocaleUpperCase();

        let hsv = Utils.RGBTOHSV(sc.r,sc.g,sc.b);
        let pc = Utils.HSVTORGB(hsv.h,1,1);
        let pv = 1-hsv.h/360;
        this.selectColor = sc;
        this.primaryColor = pc;
        this.hexColor = _hex;
        this.colorAlpha = a;
        this.xScale = ~~(hsv.s*100)/100;
        let max1 = Math.max(pc.r,pc.g,pc.b);
        let max2 = Math.max(sc.r,sc.g,sc.b);
        this.yScale = 1-max2/max1;

        this.ele_primaryIcon.style.left = ~~(pv*100)+"%";
        this.ele_primaryInput.value = ~~(pv*100);

        this.ele_alphaIcon.style.left = ~~(a*100)+"%";
        this.ele_alphaInput.value = ~~(a*100);

        this.ele_colorThumb.style.left = ~~(this.xScale*100)+"%";
        this.ele_colorThumb.style.top = ~~(this.yScale*100)+"%";
        this.ele_colorArea.style.backgroundImage = "linear-gradient(to right,#FFFFFF 0%,rgb("+pc.r+","+pc.g+","+pc.b+") 100%)";
    }


    //获得颜色
    getColor(){
        return {
            hex:this.hexColor,
            color:this.selectColor,
            alpha:this.colorAlpha
        }
    }

}

export default Main;