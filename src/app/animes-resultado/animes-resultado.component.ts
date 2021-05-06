import { Component, Input, OnInit } from '@angular/core';
import Models from '../animes/animes.model';

@Component({
  selector: 'app-animes-resultado',
  templateUrl: './animes-resultado.component.html',
  styleUrls: ['./animes-resultado.component.scss'],
})
export class AnimesResultadoComponent implements OnInit {

  constructor() { }

  @Input() anime : Models.Anime;

  ngOnInit() {}

}
