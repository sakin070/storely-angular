import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
