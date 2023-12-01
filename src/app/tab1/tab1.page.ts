import { Component, inject } from '@angular/core';
import { IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonFab, 
  IonFabButton, 
  IonIcon, 
  IonImg 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { UserPhoto } from 'src/user-photo';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    ExploreContainerComponent,
    IonFab, IonFabButton, IonIcon,
    IonImg
  ],
})

export class Tab1Page {
  photoService: PhotoService = inject(PhotoService);
  capturedPhoto: UserPhoto | undefined;
  

  constructor() {
    addIcons({ camera })
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.setRecentPhoto();
  }

  setRecentPhoto() {
    this.capturedPhoto = this.photoService.capturedPhoto;
  }
}
