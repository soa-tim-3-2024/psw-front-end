import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasedToursComponent } from './purchased-tour-cards/purchased-tour-cards.component';
import { PurchasedTourCardComponent } from './purchased-tour-card/purchased-tour-card.component';
import { TouristPositionSimulatorComponent } from './tourist-position-simulator/tourist-position-simulator.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PurchasedToursComponent,
    PurchasedTourCardComponent
    TouristPositionSimulatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TourExecutionModule { }
