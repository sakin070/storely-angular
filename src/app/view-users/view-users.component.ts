import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  userTable = true;
  users: any[] = [];
  user = {
    id: 0,
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    active: true,
    roles: [{
      id: 0
    }]
  };
  searchString = '';
  pageSize = 9;
  currentPage = new BehaviorSubject(1);
  totalPages = new BehaviorSubject(1);
  roles = [
    {
      id: 1,
      name: 'ADMIN',
      authority: 'ADMIN'
    },
    {
      id: 2,
      name: 'MANAGER',
      authority: 'MANAGER'
    },
    {
      id: 3,
      name: 'RETURNS',
      authority: 'RETURNS'
    }
  ];
  check1 = false;
  check2 = false;
  check3 = false;
  showDeleteModal = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {}
  search(): void{
    this.getPage(1);
    this.currentPage.next(1);
  }
  modify(index: number): void {
    this.user = this.users[index];
    console.log(this.user);
    this.check1 = this.contains(this.roles[0]);
    this.check2 = this.contains(this.roles[1]);
    this.check3 = this.contains(this.roles[2]);
    this.userTable = false;
  }
  contains(role: any): boolean{
    return this.user.roles.some(x => x.id === role.id);
  }
  back(): void {
    this.userTable = true;
  }
  getPage = (currentPage: number): void => {
    if (this.searchString === ''){
      this.userService.getUsers(currentPage - 1, this.pageSize).subscribe( data => {
        this.users = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }else{
      this.userService.getUsersByUsername(this.searchString, currentPage - 1, this.pageSize).subscribe( data => {
        this.users = data.content;
        this.totalPages.next( data === [] ? 1 : data.totalPages);
      });
    }
  }
  deleteUser(): void{
    this.user.active = false;
    this.updateUser();
    this.hideModal();
  }
  updateUser(): void{
    // @ts-ignore
    if (document.getElementById('admin').checked){
      this.user.roles.push(this.roles[0]);
    }else{
      this.user.roles = this.user.roles.filter((role) => role.id !== 1);
    }
    // @ts-ignore
    if (document.getElementById('manager').checked){
      this.user.roles.push(this.roles[1]);
    }else{
      this.user.roles = this.user.roles.filter((role) => role.id !== 2);
    }
    // @ts-ignore
    if (document.getElementById('returns').checked){
      this.user.roles.push(this.roles[2]);
    }else{
      this.user.roles = this.user.roles.filter((role) => role.id !== 3);
    }
    this.userService.updateUserRole(this.user).subscribe(() => {
      this.userService.getUsers(this.currentPage.value, this.pageSize).subscribe(
        () => this.userTable = true
      );
    });
  }
  delete(): void{
    this.showDeleteModal = true;
  }
  hideModal(): void{
    this.showDeleteModal = false;
  }
}
