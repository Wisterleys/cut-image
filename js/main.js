
 let startX, startY,relativeX,relativeY,endX,endY,relativeEndX,relativeEndY;
 let toggle=false;
function clickFile(el){
    return el.parentNode.querySelector('input[type=file]')
}

document.addEventListener("DOMContentLoaded",function(){
    const selection = document.querySelector(".selection")
    const photoPreview = document.querySelector("img")
    const image = new Image();

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
            crop()
        }
    }


    //Ações
    Object.keys(EVENTS).forEach(ev=>photoPreview.addEventListener(ev,EVENTS[ev]))//Ativação de eventos
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

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d')
    image.onload=function () {
        const {height,width}=image
        canvas.width=width
        canvas.height=height
        ctx.clearRect(0,0,width,height)
        ctx.drawImage(image,0,0)
        photoPreview.src=canvas.toDataURL()
      }

      function crop(){
        const { width: imgW, height: imgH } = image
        const { width: previewW, height: previewH } = photoPreview
    
        const [ widthFactor, heightFactor ] = [ 
            +(imgW / previewW), 
            +(imgH / previewH)
        ]
    
        const [ selectionWidth, selectionHeight ] = [
            +selection.style.width.replace('px', ''),
            +selection.style.height.replace('px', '')
        ]
    
        const [ croppedWidth, croppedHeight ] = [
            +(selectionWidth * widthFactor),
            +(selectionHeight * heightFactor)
        ]
    
        const [actualX, actualY] = [
            +( relativeStartX * widthFactor ),
            +( relativeStartY * heightFactor )
        ]
    
        // pegar do ctx a imagem cortada
        const croppedImage = ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)
    
        // limpar o ctx
        ctx.clearRect(0,0,ctx.width,ctx.height)
    
        // ajuste de proporções
        image.width = canvas.width = croppedWidth;
        image.height = canvas.height = croppedHeight;
    
        // adicionar a imagem cortada ao ctx
        ctx.putImageData(croppedImage, 0, 0)
    
        // esconder a ferramenta de seleção
        selection.style.display = 'none'
    
        // atualizar o preview da imagem
        photoPreview.src = canvas.toDataURL()
    
        /* // mostrar o botão de download
        downloadButton.style.display = 'initial' */
    }
})