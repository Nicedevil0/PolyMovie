import { UserService } from 'src/app/services/user.service';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentUser!: User | null;

  constructor(private userService: UserService, private storageService: StorageService) {
    this.currentUser = this.storageService.getUser();
    this.storageService.changeEmitted$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.userService.logout();
  }
}
