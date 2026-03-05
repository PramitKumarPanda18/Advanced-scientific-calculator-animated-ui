let tokens=[]
let mode="DEG"

const display=document.querySelector(".display")
const buttons=document.querySelectorAll("button")
const history=document.getElementById("historyList")
const modeToggle=document.getElementById("modeToggle")
const clearHistory=document.getElementById("clearHistory")

buttons.forEach(button=>{
button.addEventListener("click",()=>{
handleInput(button.innerText)
})
})

modeToggle.addEventListener("click",()=>{
mode = mode==="DEG" ? "RAD":"DEG"
modeToggle.innerText=mode
})

clearHistory.addEventListener("click",()=>{
history.innerHTML=""
})

function handleInput(value){

if(value==="C"){
tokens=[]
updateDisplay()
return
}

if(value==="⌫"){
tokens.pop()
updateDisplay()
return
}

if(value==="="){
calculate()
return
}

const map={
"×":"*",
"÷":"/",
"−":"-",
"^":"**",
"π":"Math.PI",
"e":"Math.E",
"log":"Math.log10("
}

if(value==="sin"||value==="cos"||value==="tan"){
tokens.push({
display:value+"(",
actual:value+"("
})
}

else if(value==="√"){
tokens.push({
display:"√(",
actual:"Math.sqrt("
})
}
else if(map[value]){
tokens.push({
display:value,
actual:map[value]
})
}
else{
tokens.push({
display:value,
actual:value
})
}

updateDisplay()
}

function updateDisplay(){
display.value=tokens.map(t=>t.display).join("") || "0"
}

function calculate(){

try{

let expression=tokens.map(t=>t.actual).join("")

if(mode==="DEG"){
expression=expression
.replace(/sin\((.*?)\)/g,"Math.sin(($1)*Math.PI/180)")
.replace(/cos\((.*?)\)/g,"Math.cos(($1)*Math.PI/180)")
.replace(/tan\((.*?)\)/g,"Math.tan(($1)*Math.PI/180)")
}else{
expression=expression
.replace(/sin/g,"Math.sin")
.replace(/cos/g,"Math.cos")
.replace(/tan/g,"Math.tan")
}

let result=eval(expression)

addHistory(display.value,result)

tokens=[{
display:result.toString(),
actual:result.toString()
}]

updateDisplay()

display.classList.add("flash")

setTimeout(()=>{
display.classList.remove("flash")
},300)

}
catch{
display.value="Error"
tokens=[]
}

}

function addHistory(exp,result){

const li=document.createElement("li")
li.innerText=exp+" = "+result
history.prepend(li)

}

/* floating particles */

const symbols=["+","−","×","÷","π","√","sin","cos","tan","log","=","^"]

function createParticle(){

const particle=document.createElement("div")
particle.classList.add("particle")

particle.innerText=symbols[Math.floor(Math.random()*symbols.length)]

particle.style.left=Math.random()*100+"vw"

particle.style.animationDuration=(6+Math.random()*6)+"s"

particle.style.fontSize=(16+Math.random()*20)+"px"

document.getElementById("particles").appendChild(particle)

setTimeout(()=>{
particle.remove()
},12000)

}

setInterval(createParticle,700)