import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { UserPhoto } from 'src/user-photo';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  photos: UserPhoto[] = [];
  capturedPhoto: UserPhoto | undefined;
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;


  constructor(platform: Platform) { 
    this.platform = platform;
  }

  async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImage = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImage);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  //convert Photo Object into base64 and save to FileSystem
  private async savePicture(photo: Photo) {
    const base64Data =  await this.readAsBase64(photo);
    const fileName = Date.now() +  ".jpeg";
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents
    });
    if (this.platform.is("hybrid")) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri), //Capacitor and Cordova apps are hosted on a local HTTP server so we need an URI 
      };
    }

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  } 

  private async readAsBase64(photo: Photo) {
    //Mobile check: Cordova or Capacitor
    if (this.platform.is("hybrid")){
        // Read the file into base64 format
        const file = await Filesystem.readFile({
       path: photo.path!
      });

      return file.data;
    } 
    //Web
    else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
    // Retrieve cached photo array data
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];
    //On mobile, we can directly set the source of an image tag - <img src="x" /> 
    ///Web requires reading each image from the Filesystem into base64 format
    if (!this.platform.is("hybrid")) {
      for (let photo of this.photos) {
          const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Web only: Load the photo as base64 data 
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }

    console.log(this.photos);
  }
  async deletePicture(photo: UserPhoto, position: number) {
      this.photos.splice(position, 1);
     // Update photos array cache by overwriting the existing photo array
      Preferences.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos)
      });

      const filename = photo.filepath
      .substring(photo.filepath.lastIndexOf('/') + 1);
  }
}
