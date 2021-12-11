function clickFile(el){
    return el.parentNode.querySelector('input[type=file]')
}
document.addEventListener("DOMContentLoaded",function(){
    document.querySelector('input[type=file]').onchange=function(){
        console.log(this.files)
    }
    const fileBtn = document.querySelectorAll(".btn-get")
    fileBtn.forEach(btn=>{btn.onclick=function(){
        clickFile(this).click()
    } })
})