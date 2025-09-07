//Meta a la que el animador tiene que llegar cada semana
const weeklyFee = 15.0
//Descripcion del objeto shot (mas adelante sera mas complejo)
class Shot{
    constructor(duration, dueDate, status){
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
    internalCorrections : 'Internal Corrections',
}

//Funciones del DOM
//Inicia el programa pidiendo el nombre y mostrando el form

function start(){
    //Agarrar datos de local.Storage 
}

//Limpia los inputs segun el modal actual
let modalInputs = [];
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn")) {
    // find the closest modal from the clicked button
    const modal = e.target.closest(".modal");
    if (!modal) return;
    modalInputs = modal.querySelectorAll("input, textarea");
  }
});

function clearInputs(inputs){
    inputs.forEach(el => {
        el.value = ""; // reset input/textarea
    });
}

//añade un nuevo objeto shot al array de animador.assignments tomando el dato del textbox
function addShot(){
    let frames = parseInt(document.getElementById("frames-count").value)
    let today = new Date();
    animador.assignments.push(new Shot(frames,shotStatus.new,`"${today.getDay+3}-${today.getMonth.toString}-${today.getFullYear}"`))
    
    console.log("Total de segundos acumulados: " + totalSeconds())
    clearInputs(modalInputs)
}

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



