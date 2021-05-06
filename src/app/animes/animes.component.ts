import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FindAnimeService } from '../find-anime.service';
import Models from './animes.model';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss'],
})
export class AnimesComponent implements OnInit {

  cargando = false;
  ultimoTexto = "";
  ultimoFiltro = "";
  animes : Models.Animes | undefined;
  maxPage = 0;

  private animesSub : Subscription | undefined

  @Input() nombre = "";

  @Input() filtro = "";

  page = 1;

  constructor(private serv : FindAnimeService, public loadingController: LoadingController) { }

  ngOnInit(): void {
    this.cargando = true;
  }

  async buscar()
  {
    if(this.nombre === "") return;
    if(this.nombre.length<3) return;
    this.ultimoTexto = this.nombre;
    this.ultimoFiltro = this.filtro;
    this.cargando = true;
    this.page = 1;

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    loading.present();

    this.animesSub = this.serv.fetchAnimes(encodeURI(this.nombre), this.filtro, this.page).subscribe(async anime =>{
      this.animes = anime;
      this.cargando = false;
      this.maxPage = anime.last_page;
      loading.dismiss();
    },  error =>{loading.dismiss });
  }

  ngOnDestroy()
  {
      if(this.animesSub)
      {
        this.animesSub.unsubscribe();
      }
  }

  async avanzar()
  {
      this.page++;
      this.cargando = true;
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando...',
      });
      loading.present();
      this.animesSub = this.serv.fetchAnimes(encodeURI(this.ultimoTexto), this.ultimoFiltro, this.page).subscribe(anime =>{
        this.animes = anime; this.cargando = false;
        loading.dismiss();
      }, error =>{loading.dismiss });
  }

  async retroceder()
  {
     this.page--;
     this.cargando = true;
     const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
     this.animesSub = this.serv.fetchAnimes(encodeURI(this.ultimoTexto), this.ultimoFiltro, this.page).subscribe(anime =>{
        this.animes = anime; this.cargando = false;
        loading.dismiss();
      },  error =>{loading.dismiss });
  }


}
