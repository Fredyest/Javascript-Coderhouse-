//Esconde el formulario desde el inicio
document.getElementById("shotsRegistration").style.display = "none";
//Meta a la que el animador tiene que llegar cada semana
const weeklyFee = 15
//Descripcion del objeto shot (mas adelante sera mas complejo)
class Shot{
    constructor(duration, assignee, status){
        this.duration = duration
        this.assignee = assignee
        this.status = status
    }
//Metodo que transforma la duracion en frames a segundos (cada segundo son 24 fotogramas de animacion)
    framesToSeconds(){
        let secondsValue = this.duration/24
        return secondsValue
    }
}
//Objeto literal del animador
let animador = {
    name : "Animator",
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

//Variable que determina si el animador alcanzo la meta propuesta
let wasReached = totalSeconds >= weeklyFee

//Objeto literal que trata de emular un Enum (En este momento es irrelevante, pero dependiendo de en que estado este cada shot, calcula si va a contar para el 
//pago de la semana o no)
const shotStatus = {
    inProgress : 'In Progress',
    aproved : 'Aproved',
    onHold : 'On Hold',
    new : 'New',
    internalCorrections : 'Internal Corrections',
    clientCorrectios : 'Client Corrections'
}

//Funciones del DOM
//Inicia el programa pidiendo el nombre y mostrando el form
function start(){
    animador.name=prompt("Ingrese nombre del animador")
    console.log("Bienvenido(a) "+ animador.name)
    document.getElementById("shotsRegistration").style.display = "block";
    document.getElementById("start").disabled = true;
}

//añade un nuevo objeto shot al array de animador.assignments tomando el dato del textbox
function addShot(){
    let frames = parseInt(document.getElementById("frames").value)
    animador.assignments.push(new Shot(frames,animador.name,shotStatus.new))
    document.getElementById("shotCount").textContent = String(animador.assignments.length+1)
    console.log("Shot " + animador.assignments.length + " añadido")
    console.log("Total de segundos acumulados: " + totalSeconds())
}

//Funcion que hace el calculo neto del pago semanal y reinicia el animador.assignments
function payWeek(){
    let weeklyTotalPay = rawTotalPay()
    if(wasReached){
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
    let confirmationMsg;
    if(wasReached){
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



