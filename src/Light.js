import html from "./template/Light.html";
import "./css/Light.css";
class Light{
    constructor(_clickBack){
        this.root = document.createElement("div");
        this.root.innerHTML = html;
        this.root.className = "cp-light-tsh";

        this.clickBack = _clickBack;
        this.ele_inner = this.root.querySelector(".cp-light-tsh .cp-preview-inner");;
        this.root.addEventListener("click",this.clickHandler);
    }

    clickHandler = (event) =>{
        if(this.clickBack){
            this.clickBack(event);
        }
    }

    setColor(_hex,_a){
        // if(!this.ele_inner){
        //     this.ele_inner = document.querySelector(".cp-light-tsh .cp-preview-inner");
        // }
        this.ele_inner.style.backgroundColor = _hex;
        this.ele_inner.style.opacity = _a;
    }
}

export default Light;