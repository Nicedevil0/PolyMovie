import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {data:{message, type:'success'}, horizontalPosition: 'right', verticalPosition: 'top', duration: 5000});
  }

  showError(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {data:{message, type:'error'}, horizontalPosition: 'right', verticalPosition: 'top', duration: 5000});
  }
}
