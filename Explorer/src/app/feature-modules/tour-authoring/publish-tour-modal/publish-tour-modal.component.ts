import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Tour } from "../model/tour.model";
import {
    faPersonWalking,
    faBicycle,
    faCarSide,
    faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { TourDuration, TransportType } from "../model/tourDuration.model";
import { TourAuthoringService } from "../tour-authoring.service";
import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";
import { xpError } from "src/app/shared/model/error.model";
import { TourExecutingComponent } from "../../tour-execution/tour-executing/tour-executing.component";

export interface PublishTourModalData {
    tour: Tour;
    walkingDuration: number;
    bicycleDuration: number;
    carDuration: number;
    distance: number;
}

@Component({
    selector: "xp-publish-tour-modal",
    templateUrl: "./publish-tour-modal.component.html",
    styleUrls: ["./publish-tour-modal.component.css"],
})
export class PublishTourModalComponent {
    faWalk = faPersonWalking;
    faBicycle = faBicycle;
    faCar = faCarSide;

    constructor(
        public dialog: MatDialog,
        private service: TourAuthoringService,
        private notifier: NotifierService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: PublishTourModalData,
    ) {}

    publishForm = new FormGroup({
        onFootChecked: new FormControl<boolean>(true),
        bicycleRideChecked: new FormControl<boolean>(false),
        carRideChecked: new FormControl<boolean>(false),
    });

    publishTour() {
        const tour = this.data.tour;
        tour.distance = Math.round(this.data.distance * 100) / 100;

        if (this.publishForm.value.onFootChecked) {
            const tourDuration: TourDuration = {
                duration: this.data.walkingDuration,
                transportType: TransportType.Walking,
            };

            this.handleCheckedDurations(this.data.tour, tourDuration);
        } 

        if (this.publishForm.value.bicycleRideChecked) {
            const tourDuration: TourDuration = {
                duration: this.data.bicycleDuration,
                transportType: TransportType.Bicycle,
            };

            this.handleCheckedDurations(this.data.tour, tourDuration);
        } 

        if (this.publishForm.value.carRideChecked) {
            const tourDuration: TourDuration = {
                duration: this.data.carDuration,
                transportType: TransportType.Car,
            };

            this.handleCheckedDurations(this.data.tour, tourDuration);
        } 

        this.service.updateTour(tour).subscribe({
            next: () => {
                if (
                    tour.keyPoints!.length > 1 &&
                    tour.durations &&
                    tour.durations.length > 0
                ) {
                    this.service.publishTour(tour).subscribe({
                        next: () => {
                            this.dialog.closeAll();
                            this.router.navigate(["/tours"]);
                            this.notifier.notify(
                                "success",
                                "Successfully published tour!",
                            );
                        },
                        error: err => {
                            this.notifier.notify(
                                "error",
                                xpError.getErrorMessage(err),
                            );
                        },
                    });
                } else {
                    this.notifier.notify(
                        "error",
                        "Tour does not meet the requirements.",
                    );
                }
            },
            error: (err: any) => {
                this.notifier.notify("error", xpError.getErrorMessage(err));
            },
        });
    }

    handleCheckedDurations(tour: Tour, tourDuration: TourDuration): void {
        tour.durations = []
        tour.durations.push(tourDuration)
    }

    handleUncheckedDurations(tour: Tour, type: TransportType): void {
        if (tour.durations) {
            let counter = 0;
            for (let t of tour.durations) {
                if (t.transportType == type) {
                    tour.durations.splice(counter, 1);
                    break;
                }
                counter++;
            }
        }
    }

    toggleWalking() {
        this.publishForm.controls["onFootChecked"].setValue(
            true
        );
        this.publishForm.controls["bicycleRideChecked"].setValue(
            false
        );
        this.publishForm.controls["carRideChecked"].setValue(
            false
        );
    }

    toggleBicycle() {
        this.publishForm.controls["bicycleRideChecked"].setValue(
            true
        );
        this.publishForm.controls["onFootChecked"].setValue(
            false
        );
        this.publishForm.controls["carRideChecked"].setValue(
            false
        );
    }

    toggleCar() {
        this.publishForm.controls["carRideChecked"].setValue(
            true
        );
        this.publishForm.controls["onFootChecked"].setValue(
            false
        );
        this.publishForm.controls["bicycleRideChecked"].setValue(
            false
        );
    }
}
