import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // @ts-ignore
  @Input() itemId: number;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    const item: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('menu-item') as HTMLCollectionOf<HTMLElement> ;
    item[this.itemId].style.filter =  'invert(53%) sepia(76%) saturate(3665%) hue-rotate(199deg) brightness(99%) contrast(97%)';
  }

  showSubMenu(event: Event): void{
    const target = event.target as Element;
    // @ts-ignore
    target.parentElement.querySelector('div').style.display = 'block';
  }
  hideSubmenu(event: Event): void{
    const target = event.target as Element;
    // @ts-ignore
    target.parentElement.style.display = 'none';
  }

  logout(): void{
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
