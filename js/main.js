
 let startX, startY,relativeX,relativeY,endX,endY,relativeEndX,relativeEndY;
 let toggle=false;
function clickFile(el){
    return el.parentNode.querySelector('input[type=file]')
}
document.addEventListener("DOMContentLoaded",function(){
    const selection = document.querySelector(".selection")
    const image = document.querySelector("img")

    const EVENTS ={
        mousedown(){
            toggle=true
            const {clientX,clientY,offsetX,offsetY}=event;
            startX=clientX;
            startY=clientY;
            relativeX=offsetX;
            relativeY=offsetY;
        },
        mouseover(){
            this.style.cursor="crosshair"
        },
        mousemove(){
            if(toggle){
                const {clientX,clientY}=event
                endX=clientX;
                endY=clientY;
                selection.style.visibility="visible";
                selection.style.top=startY+"px"
                selection.style.left=startX+"px"
                selection.style.width=(endX-startX)+"px";
                selection.style.height=(endY-startY)+"px";
            }
        },
        mouseup(){
            toggle=false
            relativeEndX = event.layerX;
            relativeEndY = event.layerY;
            selection.style.visibility="hidden";
        }
    }


    //Ações
    Object.keys(EVENTS).forEach(ev=>image.addEventListener(ev,EVENTS[ev]))//Ativação de eventos
    document.querySelector('input[type=file]').onchange=function(){
        const read = new FileReader();
        read.readAsDataURL(this.files[0])
        read.onload=function () {
            image.src=read.result
            console.dir(image)
            const {offsetHeight,offsetWidth,offsetX} = image
            console.log(offsetX)
         }
        
    }
    const fileBtn = document.querySelectorAll(".btn-get")
    fileBtn.forEach(btn=>{btn.onclick=function(){
        clickFile(this).click()
    } })
})