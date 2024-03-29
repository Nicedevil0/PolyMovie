import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login!: string;
  password!: string;
  type: string = 'CONNECT';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      console.log(data);
      this.type = data['type'] === 'register' ? 'REGISTER' : 'CONNECT';
    });
  }

  signin() {
    if(this.type === 'CONNECT'){
      this.userService.login(this.login, this.password);
    } else {
      this.userService.register(this.login, this.password);
    }
  }

  changeType() {
    this.type = this.type === 'CONNECT' ? 'REGISTER' : 'CONNECT';
  }
}
