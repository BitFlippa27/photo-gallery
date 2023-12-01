import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonToggle, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, images, contrastOutline, camera } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonToggle, 
    IonIcon, 
    IonLabel, 
    IonItem,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  darkMode = true;

  constructor() {
    addIcons({ triangle, ellipse, square, images, contrastOutline, camera });
    this.checkDarkMode();
  }

  async checkDarkMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
  
    if (checkIsDarkMode?.value === "true") {
      this.darkMode = true;
      document.body.classList.toggle("dark", this.darkMode)
    } else if (checkIsDarkMode?.value === "false") {
      this.darkMode = false;
      document.body.classList.toggle("dark", this.darkMode);
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark", this.darkMode)

   if (this.darkMode === true) {
      Preferences.set({key:"darkModeActivated", value: "true"})
      //localStorage.setItem("darkModeActive", "true");
    } else {
      Preferences.set({key:"darkModeActivated", value: "false"})
      //localStorage.setItem("darkModeActive", "false");
    }
  }
}
