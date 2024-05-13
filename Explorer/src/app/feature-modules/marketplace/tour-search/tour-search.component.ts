import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { MapComponent } from "src/app/shared/map/map.component";
import { MarketplaceService } from "../marketplace.service";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Tour } from "../../tour-authoring/model/tour.model";
import { PublicFacilities } from "../model/public-facilities.model";
import { PublicKeyPoint } from "../model/public-key-point.model";
import { SortOption } from "../model/sort-option.model";
import {
    faSort,
    faFilter,
    faXmark,
    faChevronDown,
    faArrowUpWideShort,
    faArrowDownWideShort,
    faChevronLeft,
    faChevronRight,
    faLocationDot,
    faStar,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/infrastructure/auth/auth.service";
import { LocationCoords } from "src/app/shared/model/location-coords.model";
import { animate, style, transition, trigger } from "@angular/animations";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "xp-tour-search",
    templateUrl: "./tour-search.component.html",
    styleUrls: ["./tour-search.component.css"],
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({ opacity: 0, transform: "translateX(-40px)" }),
                animate(
                    "0.5s ease",
                    style({ opacity: 1, transform: "translateX(0)" }),
                ),
            ]),
        ]),
    ],
})
export class TourSearchComponent implements OnInit {
    faSort = faSort;
    faFilter = faFilter;
    faXmark = faXmark;
    faChevronDown = faChevronDown;
    faArrowUpWideShort = faArrowUpWideShort;
    faArrowDownWideShort = faArrowDownWideShort;
    faChevronLeft = faChevronLeft;
    faChevronRight = faChevronRight;
    faLocationDot = faLocationDot;
    faStar = faStar;
    faClock = faClock;
    dropped: { [key: string]: boolean } = {};
    @ViewChild(MapComponent, { static: false }) mapComponent: MapComponent;
    longitude: number = -200;
    latitude: number = -200;
    distance: number = 0;
    searchFilter: {
        longitude: number;
        latitude: number;
        distance: number;
        name: string;
        minPrice: number | string;
        maxPrice: number | string;
        onDiscount: boolean;
        minDifficulty: number;
        maxDifficulty: number;
        minDuration: number | string;
        maxDuration: number | string;
        minAverageRating: number;
        minLength: number | string;
        maxLength: number | string;
        page: number;
        pageSize: number;
    };
    sortOption: SortOption = SortOption.NoSort;
    slider: any;
    tours: Tour[] = [];
    toursBackup: Tour[] = [];
    recommendedTours: Tour[] = [];
    activeTours: Tour[] = [];
    radioButtonSelected: number = 1;
    publicFacilities: PublicFacilities[] = [];
    publicKeyPoints: PublicKeyPoint[] = [];
    totalCount: number = 0;
    currentPage: number = 1;
    pageSize: number = 10;
    pages: any[] = [];

    constructor(
        private service: MarketplaceService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.searchFilter = {
            name: "",
            longitude: -200,
            latitude: -200,
            distance: 0,
            minPrice: 0,
            maxPrice: 0,
            onDiscount: false,
            minDifficulty: 0,
            maxDifficulty: 5,
            minDuration: 0,
            maxDuration: 0,
            minAverageRating: 0,
            minLength: 0,
            maxLength: 0,
            page: this.currentPage,
            pageSize: this.pageSize,
        };

        this.route.queryParams.subscribe(params => {
            const tourName = params['tourName'];

            if (tourName) {
                this.searchFilter.name = tourName;
            }
        });

        this.dropped = {
            locationDropped: true,
            nameDropped: true,
            priceDropped: true,
            discountDropped: true,
            difficultyDropped: true,
            durationDropped: true,
            ratingDropped: true,
            lengthDropped: true,
        };
        this.slider = document.getElementById("slider");
        this.getPublicFacilities();
        this.getPublicKeyPoints();
        this.resetMinPrice();
        this.resetMaxPrice();
        this.resetOnDiscount();
        //this.resetMinDuration();
        //this.resetMaxDuration();
        this.resetMinLength();
        this.resetMaxLength();
        this.getRecommendedTours();
        setTimeout(() => {
            this.getActiveTours();
        }, 100);
        setTimeout(() => {
            this.getPublishedTours();
        }, 1000);
        this.radioButtonSelected = 0;
    }

    onMapClicked(): void {
        this.mapComponent.getClickCoordinates((lat, lng) => {
            this.latitude = lat;
            this.longitude = lng;
            this.searchFilter.longitude = lng;
            this.searchFilter.latitude = lat;
        });
    }

    onSearch(page: number): void {
        this.radioButtonSelected = 0;
        this.searchFilter.page = page;
        this.currentPage = page;
        this.service.searchTours(this.searchFilter, this.sortOption).subscribe({
            next: (result: PagedResults<Tour>) => {
                this.tours = result.results;
                this.totalCount = result.totalCount;
                console.log(this.tours);
                this.setPages();
                this.scrollToTop();
            },
            error: errData => {
                console.log(errData);
            },
        });
    }

    setTours(result: Tour[]) {
        let add;
        result.forEach(tour => {
            add = true;
            this.tours.forEach(el => {
                if (el.id == tour.id) {
                    add = false;
                }
            });
            if (add) {
                this.tours.push(tour);
            }
        });
        console.log(this.tours);
    }

    onSliderChanged(): void {
        this.distance = this.slider.value;
    }

    getPublicFacilities(): void {
        this.service.getPublicFacilities().subscribe({
            next: (result: PagedResults<PublicFacilities>) => {
                this.publicFacilities = result.results;
                for (let fac of this.publicFacilities) {
                    this.mapComponent.setMarkersForAllFacilities(
                        fac.latitude,
                        fac.longitude,
                    );
                }
            },
        });
    }

    getPublicKeyPoints(): void {
        this.service.getPublicKeyPoints().subscribe({
            next: (result: PagedResults<PublicKeyPoint>) => {
                this.publicKeyPoints = result.results;
                for (let pkp of this.publicKeyPoints) {
                    this.mapComponent.setMarkersForPublicKeyPoints(
                        pkp.latitude,
                        pkp.longitude,
                    );
                }
            },
        });
    }

    getPublishedTours(): void {
        this.service.getPublishedTours().subscribe({
            next: (result: any)=> {
                this.tours = result.TourResponses;
                this.totalCount = this.tours.length;
            },
            error: (err: any) => {
                console.log(err);
            },
        });
    }

    toggle(name: string) {
        this.dropped[name] = !this.dropped[name];
    }

    countFilters(): number {
        let number = 0;
        if (
            this.longitude !== -200 &&
            this.latitude !== -200 &&
            this.distance !== 0
        )
            number++;
        if (this.searchFilter.name !== "") number++;
        if (
            this.searchFilter.minPrice !== "" &&
            +this.searchFilter.minPrice > 0
        )
            number++;
        if (
            this.searchFilter.maxPrice !== "" &&
            +this.searchFilter.maxPrice > 0
        )
            number++;
        if (this.searchFilter.onDiscount) number++;
        if (this.searchFilter.minDifficulty > 0) number++;
        if (this.searchFilter.maxDifficulty < 5) number++;
        if (
            this.searchFilter.minDuration !== "" &&
            +this.searchFilter.minDuration > 0
        )
            number++;
        if (
            this.searchFilter.maxDuration !== "" &&
            +this.searchFilter.maxDuration > 0
        )
            number++;
        if (this.searchFilter.minAverageRating > 0) number++;
        if (
            this.searchFilter.minLength !== "" &&
            +this.searchFilter.minLength > 0
        )
            number++;
        if (
            this.searchFilter.maxLength !== "" &&
            +this.searchFilter.maxLength > 0
        )
            number++;
        return number;
    }

    resetLocationFilter() {
        this.searchFilter.longitude = -200;
        this.searchFilter.latitude = -200;
        this.searchFilter.distance = 0;
    }

    setPages(): void {
        this.pages = [];
        const pageNumber = Math.ceil(this.totalCount / this.pageSize);
        if (this.currentPage > 1) this.pages.push("<");
        if (this.currentPage > 3) this.pages.push(1);
        if (this.currentPage > 4) this.pages.push("...");
        if (this.currentPage > 2) this.pages.push(this.currentPage - 2);
        if (this.currentPage > 1) this.pages.push(this.currentPage - 1);
        this.pages.push(this.currentPage);
        if (pageNumber - this.currentPage > 0)
            this.pages.push(this.currentPage + 1);
        if (pageNumber - this.currentPage > 1)
            this.pages.push(this.currentPage + 2);
        if (pageNumber - this.currentPage > 3) this.pages.push("...");
        if (pageNumber - this.currentPage > 2) this.pages.push(pageNumber);
        if (pageNumber - this.currentPage > 0) this.pages.push(">");
    }

    switchPage(command: any): void {
        if (command === "..." || command === this.currentPage) return;
        if (command === "<") this.currentPage--;
        if (command === ">") this.currentPage++;
        if (typeof command === "number") this.currentPage = command;
        this.onSearch(this.currentPage);
    }

    validateMinPrice() {
        if (
            this.searchFilter.minPrice !== 0 &&
            this.searchFilter.maxPrice !== 0 &&
            this.searchFilter.minPrice !== "" &&
            this.searchFilter.maxPrice !== ""
        ) {
            if (+this.searchFilter.minPrice >= +this.searchFilter.maxPrice) {
                this.searchFilter.minPrice = +this.searchFilter.maxPrice - 1;
            }
        }
        var inputElement = document.getElementsByName(
            "minPrice",
        )[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.minPrice.toString();
        if (
            this.searchFilter.minPrice == 0 ||
            this.searchFilter.minPrice == -1
        ) {
            inputElement.value = "";
        }
    }

    validateMaxPrice() {
        if (
            this.searchFilter.minPrice !== 0 &&
            this.searchFilter.maxPrice !== 0 &&
            this.searchFilter.minPrice !== "" &&
            this.searchFilter.maxPrice !== ""
        ) {
            if (+this.searchFilter.minPrice >= +this.searchFilter.maxPrice) {
                this.searchFilter.maxPrice = +this.searchFilter.minPrice + 1;
            }
        }
        var inputElement = document.getElementsByName(
            "maxPrice",
        )[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.maxPrice.toString();
        if (
            this.searchFilter.maxPrice == 0 ||
            this.searchFilter.maxPrice == -1
        ) {
            inputElement.value = "";
        }
    }

    validateMinDifficulty() {
        if (
            this.searchFilter.minDifficulty >= this.searchFilter.maxDifficulty
        ) {
            this.searchFilter.maxDifficulty = Number(
                (this.searchFilter.minDifficulty + 1).toFixed(1),
            );
        }
        if (this.searchFilter.maxDifficulty == 6)
            this.searchFilter.maxDifficulty = 5;
    }

    validateMaxDifficulty() {
        if (
            this.searchFilter.maxDifficulty <= this.searchFilter.minDifficulty
        ) {
            this.searchFilter.minDifficulty = Number(
                (this.searchFilter.maxDifficulty - 1).toFixed(1),
            );
        }
        if (this.searchFilter.maxDifficulty == 0) {
            this.searchFilter.minDifficulty = 0;
            this.searchFilter.maxDifficulty = 1;
            var inputElement = document.getElementsByName(
                "maxDifficulty",
            )[0] as HTMLInputElement;
            inputElement.value = "1";
        }
    }

    validateMinDuration() {
        if (
            this.searchFilter.minDuration !== 0 &&
            this.searchFilter.maxDuration !== 0 &&
            this.searchFilter.minDuration !== "" &&
            this.searchFilter.maxDuration !== ""
        ) {
            if (
                this.searchFilter.minDuration >= this.searchFilter.maxDuration
            ) {
                this.searchFilter.minDuration =
                    +this.searchFilter.maxDuration - 1;
            }
        }
        var inputElement = document.getElementsByName(
            "minDuration",
        )[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.minDuration.toString();
        if (
            this.searchFilter.minDuration == 0 ||
            this.searchFilter.minDuration == -1
        ) {
            inputElement.value = "";
        }
    }

    validateMaxDuration() {
        if (
            this.searchFilter.minDuration !== 0 &&
            this.searchFilter.maxDuration !== 0 &&
            this.searchFilter.minDuration !== "" &&
            this.searchFilter.maxDuration !== ""
        ) {
            if (
                this.searchFilter.minDuration >= this.searchFilter.maxDuration
            ) {
                this.searchFilter.maxDuration =
                    +this.searchFilter.minDuration + 1;
            }
        }
        var inputElement = document.getElementsByName(
            "maxDuration",
        )[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.maxDuration.toString();
        if (
            this.searchFilter.maxDuration == 0 ||
            this.searchFilter.maxDuration == -1
        ) {
            inputElement.value = "";
        }
    }

    validateMinLength() {
        if (
            this.searchFilter.minLength !== 0 &&
            this.searchFilter.maxLength !== 0 &&
            this.searchFilter.minLength !== "" &&
            this.searchFilter.maxLength !== ""
        ) {
            if (this.searchFilter.minLength >= this.searchFilter.maxLength) {
                this.searchFilter.minLength = +this.searchFilter.maxLength - 1;
            }
        }
        var inputElement = document.getElementsByName(
            "minLength",
        )[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.minLength.toString();
        if (
            this.searchFilter.minLength == 0 ||
            this.searchFilter.minLength == -1
        ) {
            inputElement.value = "";
        }
    }

    validateMaxLength() {
        if (
            this.searchFilter.minLength !== 0 &&
            this.searchFilter.maxLength !== 0 &&
            this.searchFilter.minLength !== "" &&
            this.searchFilter.maxLength !== ""
        ) {
            if (this.searchFilter.minLength >= this.searchFilter.maxLength) {
                this.searchFilter.maxLength = +this.searchFilter.minLength + 1;
            }
        }
        var inputElement = document.getElementsByName(
            "maxLength",
        )[0] as HTMLInputElement;
        inputElement.value = this.searchFilter.maxLength.toString();
        if (
            this.searchFilter.maxLength == 0 ||
            this.searchFilter.maxLength == -1
        ) {
            inputElement.value = "";
        }
    }

    resetMinPrice() {
        this.searchFilter.minPrice = "";
        var inputElement = document.getElementsByName(
            "minPrice",
        )[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMaxPrice() {
        this.searchFilter.maxPrice = "";
        var inputElement = document.getElementsByName(
            "maxPrice",
        )[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetOnDiscount() {
        this.searchFilter.onDiscount = false;
        var inputElement = document.getElementsByName(
            "onDiscount",
        )[0] as HTMLInputElement;
        inputElement.value = "false";
    }

    resetMinLength() {
        this.searchFilter.minLength = "";
        var inputElement = document.getElementsByName(
            "minLength",
        )[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMaxLength() {
        this.searchFilter.maxLength = "";
        var inputElement = document.getElementsByName(
            "maxLength",
        )[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMinDuration() {
        this.searchFilter.minDuration = "";
        var inputElement = document.getElementsByName(
            "minDuration",
        )[0] as HTMLInputElement;
        inputElement.value = "";
    }

    resetMaxDuration() {
        this.searchFilter.maxDuration = "";
        var inputElement = document.getElementsByName(
            "maxDuration",
        )[0] as HTMLInputElement;
        inputElement.value = "";
    }

    getActiveTours(): void {
        this.service.getActiveTours().subscribe({
            next: (result: PagedResults<Tour>) => {
                this.activeTours = result.results;
                //  this.setActiveTours()
            },
            error: errData => {
                console.log(errData);
            },
        });
    }
    getRecommendedTours(): void {
        this.service.getRecommendedTours().subscribe({
            next: (result: PagedResults<Tour>) => {
                this.recommendedTours = result.results;
                console.log(this.recommendedTours);
                //this.setRecommendedTours()
            },
            error: errData => {
                console.log(errData);
            },
        });
    }
    setRecommendedTours() {
        this.tours = [];
        for (const obj of this.recommendedTours) {
            this.tours.push(obj);
        }
        this.tours.forEach(el => {
            el.recommended = true;
        });
    }
    setActiveTours() {
        let add;
        this.activeTours.forEach(active => {
            add = true;
            this.tours.forEach(el => {
                if (el.id == active.id) {
                    el.active = true;
                    add = false;
                }
            });
            if (add) {
                this.tours.push(active);
            }
        });
    }
    setRecommendedTag() {
        this.tours.forEach(tour => {
            for (let i = 0; i < this.recommendedTours.length; i++) {
                if (tour.id == this.recommendedTours[i].id) {
                    tour.recommended = true;
                    break;
                }
            }
        });
    }
    setActiveTag() {
        this.tours.forEach(tour => {
            for (let i = 0; i < this.activeTours.length; i++) {
                if (tour.id == this.activeTours[i].id) {
                    tour.active = true;
                    break;
                }
            }
        });
    }
    onRadioBoxClicked() {
        setTimeout(() => {
            this.setView();
        }, 200);
    }
    setView() {
        if (this.radioButtonSelected == 1) {
            // this.tours = this.toursBackup.filter((tour) => tour.recommended);
            this.tours = [];
            for (const obj of this.recommendedTours) {
                obj.recommended = true;
                this.tours.push(obj);
            }
        } else if (this.radioButtonSelected == 2) {
            this.tours = [];
            for (const obj of this.activeTours) {
                obj.active = true;
                this.tours.push(obj);
            }
        } else {
            this.getPublishedTours()
        }
        this.totalCount = this.tours.length;
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
}
