import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-authorize-modal',
  templateUrl: './authorize-modal.component.html',
  styleUrls: ['./authorize-modal.component.css']
})
export class AuthorizeModalComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  @Input()
  roles: string[] = [];
  @Output() userAuthorized = new EventEmitter<boolean> ();
  authorizeFailed = false;
  constructor( private userService: UserService) { }

  ngOnInit(): void {
  }

  authorize(): void {
    this.userService.getUserRoles(this.form.username, this.form.password).subscribe(data => {
      if (data.length === 0){
        this.authorizeFailed = true;
        this.userAuthorized.emit(false);
        return;
      }
      data.forEach( (role: { name: string; }) => {
        if (this.roles.includes(role.name )) {
          this.userAuthorized.emit(true);
          this.authorizeFailed = false;
        }
      });
    });
  }
}
