import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Service } from '../appService/service';
import { environment } from '../../environments/environmentChallenge';
import { HeroModel } from "../appService/heroModel"
import { DetailService } from './hero-detail/detail.service'
import axios from 'axios'


const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit,AfterViewInit {

selectedHero:any
heroArray:Object[] = []
newHeroArray:Object[] = []
heroes:Object[]=[]
random:number = 0
totalTeamInteligence:any[] = []
totalTeamStrength:any[] = []
totalTeamSpeed:any[] = []
totalTeamDurability:any[] = []
totalTeamPower:any[] = []
totalTeamCombat:any[] = []
TeamIntelligence:number = 0
TeamStrength:number = 0
TeamSpeed:number = 0
TeamDurability:number = 0
TeamPower:number = 0
TeamCombat:number = 0
totalTeamKgWeight:any[] = []
totalTeamLbWeight:any[] = []
totalTeamCmHeight:any[] = []
totalTeamInchHeight:any[] = []
teamKgWeight:number = 0
teamLbWeight:number = 0
teamCmHeight:number = 0
teamInchHeight:number = 0
TeamStatCollection:any[] = []
TeamSuperiorStat:number = 0
teamSuperiorStatName:string =""

  // Nombre del héroe.
// Imagen.
// Powerstats.
// Acciones para ver el detalle o eliminarlo del equipo.


  constructor(private service:Service,public detailService:DetailService) { }

   ngOnInit(): void {
  this.service.notAuthorized()
  let localHeores = JSON.parse(localStorage.getItem("heroes"))

if(localHeores == null || localHeores.length < 1){
  this.init()
}else{
  this.heroArray = localHeores
  console.log(this.heroArray)
}
}

  ngAfterViewInit(){
    this.totalTeamStats()
    this.totalTeamMeasurements()
  }

init(){
for(let i= 0 ;i <6; i++){
this.random = Math.ceil(Math.random()*732)
this.service.getCharacterById(this.random)
.then(res => {this.heroArray.push(res.data),localStorage["heroes"] = JSON.stringify(this.heroArray)})
}

}

async totalTeamStats(){

  while(!document.querySelector("#int")) {
  await new Promise(r => setTimeout(r, 1000));
}
// crear array de Stats
for(let i=0;i<this.heroArray.length;i++){
  let totalInt = Number(document.querySelectorAll('#int')[i].innerHTML)
  let totalStr = Number(document.querySelectorAll('#str')[i].innerHTML)
  let totalSpd = Number(document.querySelectorAll('#spd')[i].innerHTML)
  let totalDur = Number(document.querySelectorAll('#dur')[i].innerHTML)
  let totalPwr = Number(document.querySelectorAll('#pwr')[i].innerHTML)
  let totalCom = Number(document.querySelectorAll('#com')[i].innerHTML)
  this.totalTeamInteligence.push(totalInt)
  this.totalTeamStrength.push(totalStr)
  this.totalTeamSpeed.push(totalSpd)
  this.totalTeamDurability.push(totalDur)
  this.totalTeamPower.push(totalPwr)
  this.totalTeamCombat.push(totalCom)
}
//filtrar valores NaN del array de Stats
let newInt =  this.totalTeamInteligence.filter(val => !Number.isNaN(val))
let newStr =  this.totalTeamStrength.filter(val => !Number.isNaN(val))
let newSpd =  this.totalTeamSpeed.filter(val => !Number.isNaN(val))
let newDur =  this.totalTeamDurability.filter(val => !Number.isNaN(val))
let newPwr =  this.totalTeamPower.filter(val => !Number.isNaN(val))
let newCom =  this.totalTeamCombat.filter(val => !Number.isNaN(val))


//Suma total de Stats
for(let i=0;i<newInt.length;i++){
  this.TeamIntelligence += newInt[i]
}
for(let i=0;i<newStr.length;i++){
  this.TeamStrength += newStr[i]
}
for(let i=0;i<newSpd.length;i++){
  this.TeamSpeed += newSpd[i]
}
for(let i=0;i<newDur.length;i++){
  this.TeamDurability += newDur[i]
}
for(let i=0;i<newPwr.length;i++){
  this.TeamPower += newPwr[i]
}
for(let i=0;i<newCom.length;i++){
  this.TeamCombat += newCom[i]
}

//Caracteristica del Team por su PowerStat
this.TeamStatCollection.push(this.TeamIntelligence,this.TeamStrength,this.TeamSpeed
  ,this.TeamDurability,this.TeamPower,this.TeamCombat)
this.TeamStatCollection.sort((a,b) => b - a)
//console.log(this.TeamStatCollection)
if(this.TeamStatCollection[0] == this.TeamIntelligence){
  this.TeamSuperiorStat = this.TeamIntelligence
  this.teamSuperiorStatName = "Intelligence"
}else if(this.TeamStatCollection[0] == this.TeamStrength){
  this.TeamSuperiorStat = this.TeamStrength
  this.teamSuperiorStatName = "Strength"
}else if(this.TeamStatCollection[0] == this.TeamSpeed){
    this.TeamSuperiorStat = this.TeamSpeed
    this.teamSuperiorStatName = "Speed"
}else if(this.TeamStatCollection[0] == this.TeamDurability){
  this.TeamSuperiorStat = this.TeamDurability
  this.teamSuperiorStatName = "Durability"
}else if(this.TeamStatCollection[0] == this.TeamPower){
  this.TeamSuperiorStat = this.TeamPower
  this.teamSuperiorStatName = "Power"
}else if(this.TeamStatCollection[0] == this.TeamCombat){
  this.TeamSuperiorStat = this.TeamCombat
  this.teamSuperiorStatName = "Combat"
}
console.log(`${this.teamSuperiorStatName} Team:${this.TeamSuperiorStat}`)
let totalStatsHTML = <HTMLElement> document.querySelector('#totalStats')
totalStatsHTML.innerHTML = `
<div class=card>
<table>
<tr>
<td>Team Intelligence:</td>
<td id="int">${this.TeamIntelligence}</td>
</tr>
<tr>
<td>Team Strength:</td>
<td id="str">${this.TeamStrength}</td>
</tr>
<tr>
<td>Team Speed:</td>
<td id="spd">${this.TeamSpeed}</td>
</tr>
<tr>
<td>Team Durability:</td>
<td id="dur">${this.TeamDurability}</td>
</tr>
<tr>
<td>Team Power:</td>
<td id="pwr">${this.TeamPower}</td>
</tr>
<tr>
<td>Team Combat:</td>
<td id="com">${this.TeamCombat}</td>
</tr>
</table>
</div>
`
let teamTypeHTML = <HTMLElement> document.querySelector('#teamType')
teamTypeHTML.innerHTML=`
<div class=card>
<table>
<tr>
<td >Team Type</td>
</tr>
<tr>
<td >${this.teamSuperiorStatName}:${this.TeamSuperiorStat}</td>
</tr>
</table>
</div>

`

console.log(`Team Intelligence: ${this.TeamIntelligence}`)
//console.log(`Team Strength: ${this.TeamStrength}`)
//console.log(`Team Speed: ${this.TeamSpeed}`)
}

async totalTeamMeasurements(){
  while(!document.querySelector("#kg")) {
  await new Promise(r => setTimeout(r, 1000));
}
  //Tomar todos los datos de medidas de heroes en array
  for(let i=0;i<this.heroArray.length;i++){
      let totalKgWeight = (document.querySelectorAll('#kg')[i].innerHTML)
      let totalLbWeight = (document.querySelectorAll('#lb')[i].innerHTML)
      //ANTI-MONITOR
      let totalCmHeight = (document.querySelectorAll('#cm')[i].innerHTML).replace('.0',"00")
      //Inches (6'3 => 6.3, valores - => 0, quitar espacios vacios)
      let totalInchHeight = (document.querySelectorAll('#inch')[i].innerHTML).replace("'",".").replace("-","0")


    let reg = /\d+(?:\.\g)?/

    let kgRes = Number(totalKgWeight.match(reg))
    let cmRes = Number(totalCmHeight.match(reg))
    let lbRes = Number(totalLbWeight.match(reg))
    let inchRes = Number(totalInchHeight)

      this.totalTeamKgWeight.push(kgRes)
      this.totalTeamLbWeight.push(lbRes)
      this.totalTeamCmHeight.push(cmRes)
      this.totalTeamInchHeight.push(inchRes)
  }
  //console.log(this.totalTeamKgWeight)
//  console.log(this.totalTeamLbWeight)
  //console.log(this.totalTeamCmHeight)
  //console.log(this.totalTeamInchHeight)

//Sumar total de cada medidas
this.totalTeamKgWeight.forEach(kg =>{
  this.teamKgWeight += kg
})
this.teamKgWeight = Number((this.teamKgWeight/this.heroArray.length).toFixed(2))
//console.log(this.teamKgWeight)
this.totalTeamCmHeight.forEach(cm =>{
  this.teamCmHeight += cm
})
this.teamCmHeight = Number((this.teamCmHeight/this.heroArray.length).toFixed(2))
//console.log(this.teamCmHeight)
this.totalTeamLbWeight.forEach(lb =>{
  this.teamLbWeight += lb
})
this.teamLbWeight = Number((this.teamLbWeight/this.heroArray.length).toFixed(2))
//console.log(this.teamLbWeight)
this.totalTeamInchHeight.forEach(inch =>{
  this.teamInchHeight += inch
})
this.teamInchHeight = Number((this.teamInchHeight/this.heroArray.length).toFixed(2))
//console.log(this.teamInchHeight)

//HTML
let averageMeasuresHtml = <HTMLElement> document.querySelector('#averageMeasures')
averageMeasuresHtml.innerHTML=`
<div class="card">
<table>
<tr>
<td>Team Kg Weight:</td>
<td>${this.teamKgWeight} </td>
</tr>
<tr>
<td>Team Cm Height:</td>
<td>${this.teamCmHeight}</td>
</tr>
<tr>
<td>Team Lb Weight:</td>
<td>${this.teamLbWeight}</td>
</tr>
<tr>
<td>Team Inch Height:</td>
<td>${this.teamInchHeight}:</td>
</tr>
</table>
</div>
`


}

removeHeroe(heroe:any){
  let confirmDelete = confirm(`Desea eliminar a ${heroe.name}`)
if(confirmDelete == true)  {
let index = this.heroArray.indexOf(heroe)
this.newHeroArray = this.heroArray.splice(index,1)
console.log(this.heroArray)
localStorage["heroes"] = JSON.stringify(this.heroArray)
}
location.reload()
}

heroDet(heroe:any){
this.selectedHero = heroe
this.detailService.abrirModal()
console.log(heroe)
}

addHero(hero:any){
  if(this.heroArray.length < 6){
  this.heroArray.push(hero)
  localStorage["heroes"] = JSON.stringify(this.heroArray)
  location.reload()
}else{
  let error = alert(`
    -Team already has 6 members
    -Delete a hero of your team first
    `)
}

}

logout(){
  this.service.logout()
}

}
