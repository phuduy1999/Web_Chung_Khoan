const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

function start(){
    handle();
}

start();

function handle(){
    const btnDL=$("#btn-datlenh");
    const btnLL=$("#btn-lamlai");

    btnLL.onclick=function (){
        document.getElementById("myForm").reset();
        const errTag=document.getElementById("tag-error");
        errTag.style.display='none';
    }
}