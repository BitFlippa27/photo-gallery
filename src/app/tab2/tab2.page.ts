import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  IonHeader,
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonFab, 
  IonFabButton, 
  IonIcon, 
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    ExploreContainerComponent,
    IonFab, IonFabButton, IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  ]
})
export class Tab2Page {
  photoService: PhotoService = inject(PhotoService);

  constructor() {
  }

  async ngOnInit() {
    this.photoService.loadSaved();
  }
}
