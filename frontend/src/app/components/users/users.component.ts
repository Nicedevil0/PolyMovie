import { ConfirmationDialog } from './../confirmation-dialog/confirmation.dialog';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = []

  constructor(private userService: UserService, public dialog: MatDialog, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  delete(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: 'Confirmer la suppression de l\'utilisateur ?'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.userService.delete(userId).subscribe((users) => {
          this.notificationService.showSuccess('Utilisateur supprimé');
          this.users = users;
        });
      }
    });
  }

}
