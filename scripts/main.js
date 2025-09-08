//Meta a la que el animador tiene que llegar cada semana
const weeklyFee = 15.0
//Descripcion del objeto shot (mas adelante sera mas complejo)
class Shot{
    constructor(name,duration, status, dueDate){
        this.name = name
        this.duration = duration
        this.status = status
        this.dueDate = dueDate
    }
//Metodo que transforma la duracion en frames a segundos (cada segundo son 24 fotogramas de animacion)
    framesToSeconds(){
        let secondsValue = this.duration/24
        return secondsValue
    }
}
//Objeto literal del animador
let animador = {
    assignments : [],
    secondPrice : 15.0,
}

//Funcion que contabliza el total de segundos totales que acumulan los shots asignados al animador
function totalSeconds(){
    let seconds = 0.0
    for(let assignment of animador.assignments){
        seconds += assignment.framesToSeconds()
    }
    return seconds
}

//Funcion que devuelve el pago bruto del animador
function rawTotalPay(){
    return totalSeconds() * animador.secondPrice
}

//Objeto literal que trata de emular un Enum (En este momento es irrelevante, pero dependiendo de en que estado este cada shot, calcula si va a contar para el 
//pago de la semana o no)
const shotStatus = {
    new : 'New',
    inProgress : 'In Progress',
    waitingReview : 'Waiting Review',
    aproved : 'Aproved',
    onHold : 'On Hold',
    internalCorrections : 'Corrections',
}

//Funciones del DOM
//Inicia el programa pidiendo el nombre y mostrando el form

const container = document.getElementById("shotTable");

function start(){
    //Agarrar datos de local.Storage 
}



        
//crear el select de las cards
function createSeclect(status){
    let selectBox = document.createElement("select");
    selectBox.classList.add("form-select");
    for (const key in shotStatus) {
        
        let optionElement = document.createElement("option");
        optionElement.textContent = shotStatus[key];
        
        if(optionElement.textContent == status){
            optionElement.setAttribute("selected", "selected");
            console.log(optionElement,optionElement.textContent,status)
        }

        selectBox.appendChild(optionElement);
    }
    return selectBox.outerHTML
}

function createCard(shot){
    let shotCard = `<div class="col">
    <div class="card w-75 h-85 text-bg-light mx-auto">
        <div class="card-header fw-semibold">Blocking</div>
        <div class="card-body">
            <h5 class="card-title">${shot.name}</h5>
            <p class="card-text font-monospace">Frames: ${shot.duration}</p>
            ${createSeclect(shot.status)}
        </div>
        <div class="card-footer bg-transparent text-end fst-italic fw-lighter">Due date: ${shot.dueDate}</div>
    </div>
    </div>`;
    return shotCard
}

function dateFormat(day,month){
    const months = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];
    return `${months[month]} - ${day}`
}

let form_AddShot = document.getElementById("new-shot")
//añade un nuevo objeto shot al array de animador.assignments tomando el dato del form del modal Add Shot
form_AddShot.addEventListener("submit", function(e){
    e.preventDefault();
    const formData = new FormData(form_AddShot)

    let newShotAdded = new Shot(formData.get("shot-name"),parseInt(formData.get("frames")),shotStatus.new,dateFormat(formData.get("day"),formData.get("month")))
    animador.assignments.push(newShotAdded)
    container.insertAdjacentHTML("beforeend", createCard(newShotAdded));

    form_AddShot.reset();
});

//añade listeners a los botones de cierre para limpiar su form
const buttons_Clear = document.querySelectorAll(".btn-clear");
buttons_Clear.forEach((btn) => {
    btn.addEventListener("click", function () {
        const formId = btn.dataset.form; // "shotForm"
        const form = document.getElementById(formId);
        if (form) form.reset();
    });
});


//Funcion que hace el calculo neto del pago semanal y reinicia el animador.assignments
function payWeek(){
    let weeklyTotalPay = rawTotalPay()
    if(totalSeconds() >= weeklyFee){
        weeklyTotalPay += 20
    }
    console.log("El pago total de la semana es de $"+weeklyTotalPay)
    console.log("Menos impuestos: $"+weeklyTotalPay*0.9)
    console.log("Shots totales realizados: "+animador.assignments.length)
    console.table(animador.assignments)
    animador.assignments = []
}

//Funcion que confirma si se quiere hacer el corte
function checPay(){
    console.log(weeklyFee,totalSeconds())
    let confirmationMsg;
    if(totalSeconds() >= weeklyFee){
        confirmationMsg = animador.name + " alcanzo su meta semanal. Estas seguro que quieres hacer el corte?"
    }
    else{
        confirmationMsg = animador.name + " no alcanzo su meta semanal. Estas seguro que quieres hacer el corte?"
    }
    let confirmationPay = confirm(confirmationMsg)
    if(confirmationPay){
        payWeek()
    }
}



