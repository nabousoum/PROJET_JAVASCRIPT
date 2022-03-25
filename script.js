const header = document.querySelector('.header');
const burger = document.getElementById('menu-burger');
const container = document.getElementById('container');
const colonne = document.getElementById('colonne');
const notes = document.getElementById('notes');
const close = document.getElementById('close');
const modalContainer = document.querySelector('.modal-container');

notes.addEventListener('click',function(){
    modalContainer.classList.toggle('show-modal');
})

close.addEventListener('click',function(){
    modalContainer.classList.remove('show-modal');
})

window.addEventListener('click',e=>e.target == modalContainer ? modalContainer.classList.remove('show-modal') : false);

burger.addEventListener('click',function(){ 
    header.classList.toggle('closeMenu');
})

var i=1;
var tabColor=["#D4B8D9","#FDBEB4","#D5C4F5","#AFE9FF","#F5EED5"]
colonne.addEventListener('click',function(){
        createColumn();
})

function createColumn(){
    const divG = document.createElement('div');
    divG.className="column";

    const div1 = document.createElement('div');
    div1.className="column-name";
    const p = document.createElement('p');
    p.innerText="colonne "+i;

    const div2 = document.createElement('div');
    div2.className="column-contain";
    div2.style.backgroundColor=tabColor[i-1];

    const divLogo = document.createElement('div');
    divLogo.className="logo";

    const img = document.createElement('img');
    img.setAttribute('height','120px');
    img.src="logoMyCutiePlanning.png";

    divLogo.appendChild(img);
    div1.appendChild(p);
    divG.appendChild(div1);
    divG.appendChild(div2);
    divG.appendChild(divLogo);
    container.appendChild(divG);
    if(i==5){
        colonne.style.display="none";
    }
    i++;
}