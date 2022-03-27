const header = document.querySelector('.header');
const burger = document.getElementById('menu-burger');
const container = document.getElementById('container');
const colonne = document.getElementById('colonne');
const notes = document.getElementById('notes');
const close = document.getElementById('close');
const modalContainer = document.querySelector('.modal-container');
const addTask = document.getElementById('addTask');
const myForm = document.getElementById('form');
const texta = document.getElementById('textarea');
const date = document.getElementById('date');
const heureDebut = document.getElementById('heureDebut');
const heureFin = document.getElementById('heureFin');

 
myForm.addEventListener('submit',function(e){
    e.preventDefault();
    const div2 = document.querySelector('.column-contain');
    var textarea = document.getElementById('textarea').value;
    var date = document.getElementById('date').value;
    var heureDebut = document.getElementById('heureDebut').value;
    var heureFin = document.getElementById('heureFin').value;
    //var data = new FormData();
   // data.append( "json", JSON.stringify( payload ) );
    
    fetch("data/db.json",
    {
        method: "POST",
        body: JSON.stringify({
            description:textarea,
            date:date,
            heureDebut:heureDebut,
            heureFin:heureFin
        }),
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ console.log(data ) })
       
        var text = texta.value;
        createTask(div2);
})

function getTask(){
    fetch('data/db.json').then((reponse) => 
    reponse.json().then((data) => {
        //console.log(data);
        createColumn(data);
    })
  );
}

getTask();



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
var tabColor=["#D4B8D9","#FDBEB4","#D5C4F5","#AFE9FF","#F5EED5"];

colonne.addEventListener('click',function(){
        createColumn();
})

function createColumn(data){
    const divG = document.createElement('div');
    divG.className="column";

    const div1 = document.createElement('div');
    div1.className="column-name";
    const p = document.createElement('p');
    p.innerText="colonne "+i;

    const div2 = document.createElement('div');
    div2.className="column-contain";
    div2.setAttribute('id',i);
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
 j=1;


function createTask(div){
    const divTask = document.createElement('div');
    divTask.className="task";

    const i1 = document.createElement('i');
    i1.className="fa-solid fa-angles-left";

    const i2 = document.createElement('i');
    i2.className="fa-solid fa-angles-right";

    const divDesc = document.createElement('div');
    divDesc.className="taskInfo";
    divDesc.innerText=texta.value;

    divTask.addEventListener('mouseenter',function(){
        divTask.style.height="100px";
        divDesc.innerHTML =`<p>date: ${date.value}</p>`;
        divDesc.innerHTML +=`<p>heure debut: ${heureDebut.value}</p>`;
        divDesc.innerHTML +=`<p>heure fin: ${heureFin.value}</p>`;
    })
    divTask.addEventListener('mouseleave',function(){
        divTask.style.height="50px";
        divDesc.innerText=texta.value;
    })

    divTask.appendChild(i1);
    divTask.appendChild(i2);
    divTask.appendChild(divDesc);
    div.appendChild(divTask);

    if(j==1)
    i1.style.visibility="hidden";

        i1.addEventListener('click',function(){
                //var part_left = document.getElementById(i);
                j--;
                if(j==1)
                i1.style.visibility="hidden";
                else
                i1.style.visibility="visible";
                var part_right = document.getElementById(j);
                    divTask.classList.add('select');
                    move(part_right);
                    divTask.classList.remove('select');
                console.log(j);
        });
      
        i2.addEventListener('click',function(){
            j++; 
            if(j==1)
            i1.style.visibility="hidden";
            else
            i1.style.visibility="visible";
                var part_right = document.getElementById(j);
                    divTask.classList.add('select');
                    move(part_right);
                    divTask.classList.remove('select');
        });
             
}

function move(right){
    const tabDiv = document.querySelectorAll('.task');
    console.log(tabDiv);
    tabDiv.forEach(div => {
            if(div.classList.contains('select')){
                right.appendChild(div);
            }
    });
}

function afficherBouton(){
    if(j==1)
    i1.style.visibility="hidden";
    else
    i1.style.visibility="visible";
    if(j==5)
    i2.style.visibility="hidden";
    else
    i2.style.visibility="visible";

}