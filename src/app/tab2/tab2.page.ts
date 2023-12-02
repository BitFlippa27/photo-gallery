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
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { PhotoService } from '../services/photo.service';
import { UserPhoto } from 'src/user-photo';
import { ActionSheetController } from '@ionic/angular';


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
  photo: UserPhoto | undefined;
  private actionSheetController: ActionSheetController;

  constructor(actionSheetController: ActionSheetController) {
    addIcons({ trash });
    this.actionSheetController = actionSheetController;    

  }

  async ngOnInit() {
    this.photoService.loadSaved();
  }

  async showActionSheet(photo: UserPhoto, position: number) {
    try {
      const actionSheet = await this.actionSheetController.create({
        header: 'Photos',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
            }
        }]
      });
      await actionSheet.present();
    } catch (error) {
      console.log("ActionSheet Error", error);
    }
  } 
}
