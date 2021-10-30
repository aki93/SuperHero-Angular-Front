import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Service } from '../../appService/service'

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  @Output() heroAdded = new EventEmitter<any>()
  close:boolean = false
  localHeroSearch:any[] = []
  searchName:string = ""
  heroSearchArray:Object[] = []
  hero:any[] = []

  constructor(public service:Service) { }
  ngOnInit(): void {}

  public searchHero(name:any){
    // let heroDelete = <HTMLElement> document.querySelector('#heroFind')
    // heroDelete.innerHTML=""
    this.heroSearchArray = []
    localStorage.removeItem("heroSearch")
    this.service.searchHeroName(name)
    .then(res => {this.heroSearchArray.push(res.data),localStorage["heroSearch"] = JSON.stringify(this.heroSearchArray),
    this.localHeroSearch = JSON.parse(localStorage.getItem("heroSearch"))
    this.hero = this.localHeroSearch[0].results
  })
  this.close = true
  }

closeSearch(){
  this.heroSearchArray = []
  localStorage["heroSearch"] = JSON.stringify(this.heroSearchArray)
  this.close = false
}

addHero(hero:any){
  this.heroAdded.emit(hero)
  console.log(hero)
}

}
