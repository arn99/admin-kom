import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-install-modal',
  templateUrl: './install-modal.component.html',
  styleUrls: ['./install-modal.component.css']
})
export class InstallModalComponent {
  @HostListener('window:beforeinstallprompt', ['$event'])
  showInstallButton = false;
  deferredPrompt: any;
  event: any;
  constructor(public dialogRef: MatDialogRef<InstallModalComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.event = data;
  }

    installApp() {
      this.deferredPrompt = this.event;
      // on affiche la boite de dialogue : installer l'application
      this.deferredPrompt.prompt();
      // selon la réponse de l'utilisateur
      this.deferredPrompt.userChoice
      .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
      console.log('Youpi, notre appli est installée');
      } else {
      console.log('Arg, il en veut pas !');
      this.showInstallButton = false;
      }
      // la madame elle fait le ménache
      this.deferredPrompt = null;
      });
    }
}
