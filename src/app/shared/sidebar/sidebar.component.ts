import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor(private gitfService:GifsService) { }

  get historial(){
    return this.gitfService.historial;
  }

  buscar(gif: string){
    this.gitfService.buscarGifs(gif)
    
  }

}
