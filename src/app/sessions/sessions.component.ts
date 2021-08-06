import { Component, OnInit } from '@angular/core';
import {SessionService} from '../_services/session.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  sessions: any[] = [];
  showSessionList = true;
  t1: any;
  t2: any;
  date: string = formatDate(new Date() , 'yyyy-MM-dd', 'en-CA');
  sessionDetails = {
    openingBalance: 0,
    additions: 0,
    remittanceSum: 0,
    cashSale: 0,
    posSale: 0,
    cashReturn: 0,
    totalReturn: 0,
    posReturn: 0,
    pointsRedeemedValue: 0,
    totalSale: 0,
    discountValue: 0
  };
  session: any = {};

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getSessionByDate(this.date).subscribe(data => {
      console.log(data);
      this.sessions = data;
      this.sessions.forEach(session => {
        session.startTime = new Date(session.startTime).toLocaleTimeString();
        if (session.endTime){
          session.endTime = new Date(session.endTime).toLocaleTimeString();
        }
      } );
    });
  }
  view(index: number): void{
    this.session = this.sessions[index];
    this.session.remittanceList.forEach( (remit: { timestamp: string | number | Date; }) =>
      remit.timestamp = new Date(remit.timestamp).toLocaleTimeString());
    this.sessionService.getSessionDetailById( this.session.id).subscribe(data => {
      this.sessionDetails = data;
      this.showSessionList = false;
    });
  }
  getSessionByDate(): void{
    this.sessionService.getSessionByDate(this.date).subscribe(data => {
      this.sessions = data;
    });
  }
  back(): void{
    this.showSessionList = true;
  }
}
