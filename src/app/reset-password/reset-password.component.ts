import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user = {
    username: '',
    firstName: '',
    lastName: '',
    firstSecurityQuestion: '',
    firstSecurityQuestionAnswer: '',
    secondSecurityQuestion: '',
    secondSecurityQuestionAnswer: '',
    thirdSecurityQuestion: '',
    thirdSecurityQuestionAnswer: '',
    active: true,
    roles: [
      {
        id: 4,
        name: 'SALES'
      }
    ],
    astring: ''
  };

  getUserError = false;
  userVerified = false;
  verifyQuestions = true;
  changePassword = false;
  rePassword = '';
  a1 = '';
  a2 = '';
  a3 = '';
  invalidSecAns = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }
  askSecQuestions(): void {
    if (this.user.username !== ''){
      this.userService.verifyUsername(this.user.username).subscribe(data => {
        if (data){
          this.user = data;
          this.userVerified = true;
        }else{
          this.getUserError = true;
        }
      });
    }
  }
  veryQuestions(): void {
    if (this.user.firstSecurityQuestionAnswer === this.a1 &&
      this.user.secondSecurityQuestionAnswer === this.a2 &&
      this.user.thirdSecurityQuestionAnswer === this.a3){
      this.verifyQuestions = false;
      this.changePassword = true;
    }else{
      this.invalidSecAns = true;
    }
  }
  changePass(): void {
    if (this.rePassword === this.user.astring){
      this.userService.updateUser(this.user).subscribe(() => {
        this.gotoLogin();
        this.rePassword = '';
        this.a1 = '';
        this.a2 = '';
        this.a3 = '';
        this.  user = {
          username: '',
          firstName: '',
          lastName: '',
          firstSecurityQuestion: '',
          firstSecurityQuestionAnswer: '',
          secondSecurityQuestion: '',
          secondSecurityQuestionAnswer: '',
          thirdSecurityQuestion: '',
          thirdSecurityQuestionAnswer: '',
          active: true,
          roles: [
            {
              id: 4,
              name: 'SALES'
            }
          ],
          astring: ''
        };
      });

    }
  }
}
