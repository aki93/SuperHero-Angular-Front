import { Component, OnInit,Input } from '@angular/core';
import { DetailService} from './detail.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
@Input() heroDetail:any

  constructor(public detailService:DetailService) { }

  ngOnInit(): void {
  }

cerrarModal(){
  this.detailService.cerrarModal()
}



}
