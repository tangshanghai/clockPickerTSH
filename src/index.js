import Main from "./Main.js";
import Light from "./Light.js";
import Utils from "./Utils.js";
class index{
    constructor(input,_callBack,hideBack){
        // console.log("成功了");
        let inputNode = input;
        if(typeof input === 'string'){
            inputNode = document.querySelector(input);
        }
        // let inputNode = document.querySelector(input);
        let light = new Light(clickHandler.bind(this));
        this.light = light;
        this.main = new Main(colorChange);
        
        // this.main.init();
        this.main.root.style.display = "none";
        
        var parent = inputNode.parentNode;
        if(parent.lastChild == inputNode){ 
            parent.appendChild(light.root);
        }else{
            parent.insertBefore(light.root, inputNode.nextSibling);
        }
        inputNode.style.display = "none";

        //获取light的位置
        let pos = light.root.getBoundingClientRect();
        this.main.root.style.left = pos.left+"px";
        this.main.root.style.top = (pos.top+35)+"px";
        

        // document.addEventListener("mousedown",mousedownHandler);
        // document.addEventListener("mousewheel",mousedownHandler);
        // document.addEventListener("DOMMouseScroll",mousedownHandler);

        let root = this.main.root;
        function mousedownHandler(event){
            let e = event ? event : window.event;
            if(e.target == root || root.contains(e.target)){
                return;
            }
            root.style.display = "none";
            document.removeEventListener("mousedown",mousedownHandler);
            document.removeEventListener("mousewheel",mousedownHandler);
            document.removeEventListener("DOMMouseScroll",mousedownHandler);
            if(hideBack){
                hideBack();
            }
        }

        function clickHandler(){
            this.main.root.style.display = "block";
            let pos = light.root.getBoundingClientRect();
            this.main.root.style.left = pos.left+"px";
            this.main.root.style.top = (pos.top+35)+"px";
            this.main.root.style.zIndex = Utils.getMaxZindex();

            document.addEventListener("mousedown",mousedownHandler);
            document.addEventListener("mousewheel",mousedownHandler);
            document.addEventListener("DOMMouseScroll",mousedownHandler);
        }

        function colorChange(color){
            if(_callBack){
                _callBack(color);
            }
            inputNode.value = color.hex;
            light.setColor(color.hex,color.alpha);
        }
        

        document.body.appendChild(this.main.root);

        
    }

    setColor(_hex,_alpha){
        this.main.setColor(_hex,_alpha);
        this.light.setColor(_hex,_alpha);
    }

    getColor(){
        return this.main.getColor();
    }
}
export default index;
// window.ColorPickerTSH = index;
// // export default index;
// if(typeof module === "object" && module && typeof module.exports === "object"){
//     module.exports = index;
// }
