import {Component} from '@angular/core';

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrls: ['./episodio.component.css']
})
export class EpisodioComponent {
  images: { itemImageSrc: string; thumbnailImageSrc: string }[] = [];

  showThumbnails: boolean = true;

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;
  isLoading = true;
  constructor(){
    this.images = [];
  }

  ngOnInit(){
    this.simularCarregamento();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  simularCarregamento() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simula 2 segundos de carregamento
  }
}
