import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})
export class ViewSalesComponent implements OnInit {
  users: Set<string> = new Set<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
