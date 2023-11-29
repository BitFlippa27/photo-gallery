import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonToggle, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonToggle, IonIcon, IonLabel, IonItem],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  darkMode = true;

  constructor() {
    addIcons({ triangle, ellipse, square });
    this.checkDarkMode();
  }

  async checkDarkMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark", this.darkMode)

    if (this.darkMode === true) {
      localStorage.setItem("darkModeActive", "true");
    } else {
      localStorage.setItem("darkModeActive", "false");
    }
  }
}
