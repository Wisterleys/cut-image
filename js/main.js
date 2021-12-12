function clickFile(el){
    return el.parentNode.querySelector('input[type=file]')
}
document.addEventListener("DOMContentLoaded",function(){
    const image = document.querySelector("img")
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