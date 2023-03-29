import { NotificationService } from './../../services/notification.service';
import { ActorService } from './../../services/actor.service';
import { Actor } from './../../models/actor.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.scss']
})
export class FormActorComponent {
    actor: Actor = new Actor(0, '', '', '', (new Date()).toISOString().split('T')[0], undefined);
    constructor(private actorService: ActorService, private notificationService: NotificationService, private router: Router) { }

    onSubmit() {
        if(this.actor.firstName === '' || this.actor.lastName === '') {
            this.notificationService.showError('First name and last name are required');
            return;
        }
        if(this.actor.death && this.actor.birth >= this.actor.death) {
            this.notificationService.showError('Birth date must be before death date');
            return;
        }
        if(this.actor.birth === null) {
            this.notificationService.showError('Birth date is required');
            return;
        }
        if(this.actor.image === '') {
            this.notificationService.showError('Image is required');
            return;
        }
        this.actorService.save(this.actor).subscribe(
            (a: Actor) => {
                this.notificationService.showSuccess(`Actor ${a.firstName} ${a.lastName} saved successfully`);
                this.router.navigateByUrl('/actors');
            }
        );
    }

}
