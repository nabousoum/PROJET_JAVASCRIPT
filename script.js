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
const restauration = document.getElementById('menu-recycle');
const nav = document.querySelector('.nav-bar');
const trash = document.getElementById('menu-trash');
const columnContainTrash = document.getElementById('column-contain-trash');

trash.addEventListener('click',function(){
    nav.classList.toggle('show-nav')
})

myForm.addEventListener('submit',function(e){

    //if(!checkRequired([texta, date, heureDebut, heureFin])){
        e.preventDefault();
      //  checkRequired([texta, date, heureDebut, heureFin]);
   // }
   if(addTask.getAttribute('data-edit') != 'edit'){
        const div2 = document.querySelector('.column-contain');
        createTask(div2);
   }
    //  myForm.reset();
    addTask.removeAttribute('data-edit');
})

function getTask(){
    fetch('data/db.json').then((reponse) => 
    reponse.json().then((data) => {
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
    addTask.removeAttribute('data-edit');
})
addTask.addEventListener('click',function(){
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
        var testId = parseInt(e.target.parentElement.nextElementSibling.getAttribute('id'));
        var countColumn = document.querySelectorAll('.column').length;
        //console.log(countColumn);
        if(testId!=1 || (countColumn==1 && testId==1) ){
            e.target.parentElement.parentElement.remove();
            i--;
            colonne.style.display="block";
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
            p.innerText=input.value;
        })
    })
    
}

function createTask(div){
    const divTask = document.createElement('div');
    divTask.className="task";
    
    divTask.setAttribute('data-text',texta.value);
    divTask.setAttribute('data-date',date.value);
    divTask.setAttribute('data-hour-begin',heureDebut.value);
    divTask.setAttribute('data-hour-end',heureFin.value);


    setInterval(() => {
        var dateValue = date.value;
        var heureDebutValue = heureDebut.value;
        var heureFinValue = heureFin.value;

        var time_input_debut = heureDebutValue.split(':');
        var heure_input_debut = time_input_debut[0];
        var min_input_debut = time_input_debut[1];
        // console.log(heure_input_debut);
        // console.log(min_input_debut);

        var now = new Date();
        var hour_now = now.getHours();
        var min_now = now.getMinutes();
        if((heure_input_debut==hour_now) && (min_input_debut == min_now)){
            //alert('ok')
            divTask.style.backgroundColor="green";
        }
   },1000); 
    
    const i1 = document.createElement('i');
    i1.className="fa-solid fa-angles-left";

    const iA = document.createElement('i');
    iA.className="fa-solid fa-box-archive";

    const iR = document.createElement('i');
    iR.className="fa-solid fa-arrows-spin";

    const i2 = document.createElement('i');
    i2.className="fa-solid fa-angles-right";

    const divDesc = document.createElement('div');
    divDesc.className="taskInfo";
    divDesc.innerText=texta.value;

    const divOver = document.createElement('div');
    divOver.className="divOver";
    divOver.innerHTML =`<p>date: ${date.value}</p>`;
    divOver.innerHTML +=`<p>heure debut: ${heureDebut.value}</p>`;
    divOver.innerHTML +=`<p>heure fin: ${heureFin.value}</p>`;
    divDesc.appendChild(divOver);

    divTask.appendChild(i1);
    divTask.appendChild(iA);
    divTask.appendChild(iR);
    divTask.appendChild(i2);
    divTask.appendChild(divDesc);
    div.appendChild(divTask);
    divTask.addEventListener('dblclick',function(e){

        modalContainer.classList.toggle('show-modal');
        //console.log(divTask.getAttribute('data-text'))
        texta.value = divTask.getAttribute('data-text');
        date.value = divTask.getAttribute('data-date');
        heureDebut.value = divTask.getAttribute('data-hour-begin');
        heureFin.value = divTask.getAttribute('data-hour-end');
        addTask.setAttribute('data-edit','edit');

            addTask.addEventListener('click',function(){
                if(addTask.getAttribute('data-edit') == 'edit'){
                    divTask.setAttribute('data-text',texta.value);
                    divTask.setAttribute('data-date',date.value);
                    divTask.setAttribute('data-hour-begin',heureDebut.value);
                    divTask.setAttribute('data-hour-end',heureFin.value);
                    divDesc.innerText=divTask.getAttribute('data-text');
                    divOver.innerHTML =`<p>date: ${divTask.getAttribute('data-date')}</p>`;
                    divOver.innerHTML +=`<p>heure debut: ${divTask.getAttribute('data-hour-begin')}</p>`;
                    divOver.innerHTML +=`<p>heure fin: ${divTask.getAttribute('data-hour-end')}</p>`;
                }
                //addTask.removeAttribute('data-edit');
            })
    })

    divTask.addEventListener('mouseenter',function(){
        var testClass = divTask.parentElement.classList;
        iA.style.display = 'block';
        divOver.style.display = 'block';
        if(testClass.contains('column-contain2')){
            iR.style.display = "block";
            iA.style.display = 'none';
        }
        divTask.style.height = "100px";
    })
    divTask.addEventListener('mouseleave',function(){
        iA.style.display = 'none';
        iR.style.display = "none";
        divTask.style.height = "50px";
        divOver.style.display = "none";
    })

    // var test = parseInt(divTask.parentElement.getAttribute('id'));
    // var tests = test+1;
    // setInterval(() => {
    //     if(document.getElementById(tests)==null)
    //     {
    //         i2.style.visibility="hidden";
    //     }
    //     else{
    //         i2.style.visibility="visible";
    //     }
    // },100); 

    iA.addEventListener('click',function(e){
        columnContainTrash.appendChild(e.target.parentElement);
    })

    iR.addEventListener('click',function(e){
        var divColumn1 = document.querySelector('.column-contain')
        divColumn1.appendChild(e.target.parentElement);
    })

   
    setInterval(() => {
        var test = parseInt(divTask.parentElement.getAttribute('id'));
        if(test==1){
            i1.style.visibility="hidden";
        }
    },1000); 
        i1.addEventListener('click',function(){
            i2.style.visibility="visible"
            divTask.classList.add('select');
            var indice_left = parseInt(divTask.parentElement.getAttribute('id'));
            indice_left = indice_left-1;
            var part_left = document.getElementById(indice_left);
            move(part_left);
            divTask.classList.remove('select');
        });
      
        i2.addEventListener('click',function(){
            var tab = document.querySelectorAll('.column-contain'); 
            divTask.classList.add('select');
            var indice_right = parseInt(divTask.parentElement.getAttribute('id'));
            i1.style.visibility="visible";
            indice_right = indice_right+1;
            setInterval(() => {
                var tab = document.querySelectorAll('.column-contain'); 
                var indice_right = parseInt(divTask.parentElement.getAttribute('id'));
                if((indice_right==tab.length) ){
                    i2.style.visibility="hidden";
                }
                else{
                    i2.style.visibility="visible";
                }
            },1000); 
            var part_right = document.getElementById(indice_right);
            move(part_right);
            divTask.classList.remove('select');

        });
             
        restauration.addEventListener('click',function(e){
            moveAll(document.querySelector('.column-contain'));
        })
        
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
        if(div.parentElement.classList.contains('column-contain') == true){
            right.appendChild(div);
        }
    });
}


function refresh(){
    var removables = document.querySelectorAll('.removable');
    removables.forEach((element,i) => {
        element.innerHTML = `colonne ${i+1}`;
    });
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'; 
}
function checkRequired(inputArray) {
    inputArray.forEach(input => {
        if (input.value.trim() === '') {
            showError(input,"veuillez remplir ce champ");
            return false;
        }else{
            showSuccess(input);
            return true;
        }
    });
}