import { Component, OnInit } from '@angular/core';
import {LoyaltyManagerService} from '../_services/loyalty-manager.service';

@Component({
  selector: 'app-loyalty-management',
  templateUrl: './loyalty-management.component.html',
  styleUrls: ['./loyalty-management.component.css']
})
export class LoyaltyManagementComponent implements OnInit {
  lm = {
  maxRedeemablePointsPerTransaction: 0,
  pointsForCash: 0,
  cashForPoints: 0
  };
  edit = false;
  constructor(private loyaltyManagerService: LoyaltyManagerService) { }

  ngOnInit(): void {
    this.getLM();
  }
  getLM(): void {
    this.loyaltyManagerService.getLoyaltyManager().subscribe(data => this.lm = data );
  }
  Edit(): void {
    this.edit = true;
  }
  save(): void {
    this.loyaltyManagerService.updateLoyaltyManager(this.lm).subscribe(
        () => {this.edit = false; this.getLM(); }
    );
  }
}
