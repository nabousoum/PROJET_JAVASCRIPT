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
const restauration = document.getElementById('restauration');
const nav = document.querySelector('.nav-bar');
const trash = document.getElementById('menu-trash');
const columnContainTrash = document.getElementById('column-contain-trash');

trash.addEventListener('click',function(){
    nav.classList.toggle('show-nav')
})

 
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

//  addTask.addEventListener('click',function(){
//      modalContainer.classList.remove('show-modal');
//  })


burger.addEventListener('click',function(){ 
    header.classList.toggle('closeMenu');
})

var i=1;
var tabColor=["#D4B8D9","#FDBEB4","#D5C4F5","#AFE9FF","#F5EED5"];

colonne.addEventListener('click',function(){
        createColumn();
})

function createColumn(){
    const divG = document.createElement('div');
    divG.className="column";

    const div1 = document.createElement('div');
    div1.className="column-name";
    const p = document.createElement('p');
    p.className="removable";
    p.innerText="colonne "+i;

    const iButton = document.createElement('i');
    iButton.className="fa-solid fa-xmark";
    iButton.setAttribute('id','iButton');

    const input = document.createElement('input');
    input.className='inputRename';
    div1.appendChild(input);


    const div2 = document.createElement('div');
    div2.className="column-contain";
    div2.setAttribute('id',i);
    div2.style.backgroundColor=tabColor[i-1];

    iButton.addEventListener('click',function(e){
        //console.log( e.target.parentElement.parentElement);
        var testId = parseInt(e.target.parentElement.nextElementSibling.getAttribute('id'));
        //console.log(testId)
        var countColumn = document.querySelectorAll('.column').length;
        console.log(countColumn);
        if(testId!=1 || (countColumn==1 && testId==1) ){
            e.target.parentElement.parentElement.remove();
            refresh();
        }
    });

    const divLogo = document.createElement('div');
    divLogo.className="logo";

    const img = document.createElement('img');
    img.setAttribute('height','120px');
    img.src="logoMyCutiePlanning.png";

    divLogo.appendChild(img);
    div1.appendChild(p);
    div1.appendChild(iButton);
    divG.appendChild(div1);
    divG.appendChild(div2);
    divG.appendChild(divLogo);
    container.appendChild(divG);

    if(i==5){
        colonne.style.display="none";
    }
    i++;

    div1.addEventListener('dblclick',function(){
        p.style.display="none";
        input.style.display="block";
        input.addEventListener('blur',function(){
            p.style.display="block";
            input.style.display="none";
            input.focus();
            //console.log(input.value);
            p.innerText=input.value;
        })
    })
    
}

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

    const divOver = document.createElement('div');
    divOver.className="divOver";
    divDesc.appendChild(divOver);

    divTask.addEventListener('mouseenter',function(){
        divOver.style.display='block';
        divTask.style.height="100px";
        divOver.innerHTML =`<p>date: ${date.value}</p>`;
        divOver.innerHTML +=`<p>heure debut: ${heureDebut.value}</p>`;
        divOver.innerHTML +=`<p>heure fin: ${heureFin.value}</p>`;
    })
    divTask.addEventListener('mouseleave',function(){
        divTask.style.height="50px";
        divOver.style.display="none";
    })

    divTask.appendChild(i1);
    divTask.appendChild(i2);
    divTask.appendChild(divDesc);
    div.appendChild(divTask);

    divTask.addEventListener('dblclick',function(e){
        divTask.classList.add('remove');
        console.log(e.target);
        columnContainTrash.appendChild(e.target.parentElement);
    })

    var test = parseInt(divTask.parentElement.getAttribute('id'));
    // if(test==1){
    //     i1.style.visibility="hidden";
    // }
        i1.addEventListener('click',function(){
            //i2.style.visibility="visible"
            divTask.classList.add('select');
            var indice_left = parseInt(divTask.parentElement.getAttribute('id'));
            indice_left = indice_left-1;
            var part_left = document.getElementById(indice_left);
            move(part_left);
            divTask.classList.remove('select');
        });
      
        i2.addEventListener('click',function(){
            var tab = document.querySelectorAll('.column-contain');
            //console.log(tab.length)
            divTask.classList.add('select');
            var indice_right = parseInt(divTask.parentElement.getAttribute('id'));
            //i1.style.visibility="visible";
            indice_right = indice_right+1;
            // if(indice_right==tab.length){
            //     i2.style.visibility="hidden";
            // }
            var part_right = document.getElementById(indice_right);
            move(part_right);
            divTask.classList.remove('select');

        });
             
}


function move(right){
    const tabDiv = document.querySelectorAll('.task');
    tabDiv.forEach(div => {
            if(div.classList.contains('select')){
                right.appendChild(div);
            }
    });
}
function moveAll(right){
    const tabDiv = document.querySelectorAll('.task');
    tabDiv.forEach(div => {
        right.appendChild(div);
    });
}

restauration.addEventListener('click',function(){
    console.log(document.querySelector('.column-contain'));
    moveAll(document.querySelector('.column-contain'));;
})

function refresh(){
    var removables = document.querySelectorAll('.removable');
    removables.forEach((element,i) => {
        element.innerHTML = `colonne ${i+1}`;
    });
}