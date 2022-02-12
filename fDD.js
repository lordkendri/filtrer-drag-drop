"use strict";

const zona = document.querySelector(".zona-arrastre");

zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changeStyle(e.target, "#444");
});

zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    changeStyle(e.target, "#888");
    cargarArchivo(e.dataTransfer.files[0]);
    zona.style.border = "4px solid #888"
});

zona.addEventListener("drop",(e)=>{
    e.preventDefault();
    changeStyle(e.target, "#888");
    cargarArchivo(e.dataTransfer.files[0]);
    zona.style.border = "4px solid #888"
});


const changeStyle = (obj, color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
};

const cargarArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("progress",e=>{
        let carga = Math.round((e.loaded / ar.size)*100);
        zona.textContent = `${carga}%`;
        document.querySelector(".barraCarga").style.padding = "75px 85px";
        document.querySelector(".barraCarga").style.width = `${carga/3.6}%`;
    });
    reader.addEventListener("loadend", e=>{
        changeStyle(zona,"4f9");
        zona.style.border = "4px solid #4f9";
        document.querySelector(".barraCarga").style.background = "#4f9";
        setTimeout(()=>{
            zona.style.color = "#fff";
            zona.style.animation ="aparecer", "1s forwards";
            zona.textContent = "Carga Completa"
        },500);
    });
    reader.addEventListener("load", e=>{
        let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: 'video/mp4'});
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src",url);
        document.querySelector(".resultado").appendChild(img);
        img.play();
    });
};