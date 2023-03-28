import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface SnackbarData {
  message: string;
  type: string;
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
    title: string = 'Information';
    message: string = '';
    type: string = 'info';

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {
      this.message = data.message;
      this.type = data.type;
      switch (this.type) {
        case 'success':
          this.title = 'Succès';
          break;
        case 'error':
          this.title = 'Erreur';
          break;
        case 'warning':
          this.title = 'Attention';
          break;
        case 'info':
          this.title = 'Information';
          break;
      }
    }
}
