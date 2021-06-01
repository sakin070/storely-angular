import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  rePassword = '';
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
  createUserError = false;
  formOne = true;
  secQuestions = [
      'What Is your favorite book?',
      'What is the name of the road you grew up on?',
      'What is your mother’s maiden name?',
      'What was the name of your first/current/favorite pet?',
  ];
  secQuestions2 = [
    'What was the first company that you worked for?',
    'Where did you meet your spouse?',
    'Where did you go to high school/college?'
  ];
  secQuestions3 = [
    'What is your favorite food?',
    'What city were you born in?',
    'Where is your favorite place to vacation?'
  ];
  validUsername = true;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  next(form: NgForm): void {
  this.userService.verifyUsername(this.user.username).subscribe( data => {
    if (data){
      this.validUsername = false;
    } else {
      if (form.valid && this.rePassword === this.user.astring){ this.formOne = false; }
    }});
  }
  back(): void {
    this.formOne = true;
  }
  save(): void {
    this.userService.createUser(this.user).subscribe(() => this.cancel());
  }
  cancel(): void {
    this.back();
    this.rePassword = '';
    this.user = {
      username: '',
      astring: '',
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
    };
    this.createUserError = false;
    this.validUsername = true;
  }
}
