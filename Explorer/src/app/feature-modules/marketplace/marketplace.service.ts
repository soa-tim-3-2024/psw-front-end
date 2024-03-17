import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rating } from "../administration/model/rating.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/env/environment";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Club } from "./model/club.model";
import { MyClubJoinRequest } from "./model/my-club-join-request.model";
import { ClubJoinRequest } from "./model/club-join-request.model copy";
import { ClubMember } from "./model/club-member.model";
import { ClubInvitationUsername } from "./model/club-invitation-username.model";
import { ClubInvitationWithClubAndOwnerName } from "./model/club-invitation-with-club-and-owner-name.model";
import { Review } from "./model/review.model";
import { Problem } from "./model/problem.model";
import { TourPreference } from "./model/tour-preference.model";
import { Tour } from "../tour-authoring/model/tour.model";
import { FacilityNotification } from "./model/facility-notification";
import { KeyPointNotification } from "./model/keypoint-notification";
import { PublicKeyPoint } from "./model/public-key-point.model";
import { PublicFacilities } from "./model/public-facilities.model";
import { KeyPoint } from "../tour-authoring/model/key-point.model";
import { ShoppingCart } from "./model/shopping-cart";
import { TourLimitedView } from "./model/tour-limited-view.model";
import { TourToken } from "./model/tour-token.model";
import { TourSale } from "./model/tour-sale.model";
import { Coupon } from "./model/coupon.model";
import { CouponApplication } from "./model/coupon-applicaton.model";
import { Bundle } from "../tour-authoring/model/bundle.model";
import { BundleOrderItem } from "./model/bundle-order-item.model";
import { SortOption } from "./model/sort-option.model";
import { Blog } from "../blog/model/blog.model";
import { Subscription } from "./model/subscription.model";
import { Person } from "../stakeholder/model/person.model";
import { Wishlist } from "./model/wishlist.model";

@Injectable({
    providedIn: "root",
})
export class MarketplaceService {
    cart$ = new BehaviorSubject<ShoppingCart>({
        id: 0,
        touristId: 0,
        totalPrice: 0,
        isPurchased: false,
        orderItems: [],
        bundleOrderItems: [],
    });

    constructor(private http: HttpClient) {}

    getTourPreference(): Observable<TourPreference> {
        return this.http.get<TourPreference>(
            environment.apiHost + "tourist/preferences",
        );
    }

    addPreference(tourPreference: TourPreference): Observable<TourPreference> {
        return this.http.post<TourPreference>(
            environment.apiHost + "tourist/preferences/create",
            tourPreference,
        );
    }

    addSub(sub: Subscription): Observable<Subscription> {
        return this.http.post<Subscription>(
            environment.apiHost + "tourist/subscriber",
            sub,
        );
    }

    getByUserId(userId: number): Observable<Person> {
        return this.http.get<Person>(
            environment.apiHost + "people/person/" + userId,
        );
    }

    deletePreference(id: number): Observable<TourPreference> {
        return this.http.delete<TourPreference>(
            environment.apiHost + "tourist/preferences/" + id,
        );
    }

    updatePreference(preference: TourPreference): Observable<TourPreference> {
        return this.http.put<TourPreference>(
            environment.apiHost + "tourist/preferences",
            preference,
        );
    }

    addRating(rating: Rating): Observable<Rating> {
        return this.http.post<Rating>(
            environment.apiHost + "rating/rating",
            rating,
        );
    }

    deleteRating(id: number): Observable<Rating> {
        return this.http.delete<Rating>(
            environment.apiHost + "rating/rating/" + id,
        );
    }

    getRating(id: number): Observable<Rating> {
        return this.http.get<Rating>(
            environment.apiHost + "rating/rating/" + id,
        );
    }

    updateRating(rating: Rating): Observable<Rating> {
        return this.http.put<Rating>(
            environment.apiHost + "rating/rating/" + rating.id,
            rating,
        );
    }

    getReviews(tourId: number): Observable<Review[]> {
        return this.http.get<Review[]>(
            environment.apiHost + "review/" + tourId,
        );
    }
    reviewExists(touristId: number, tourId: number): Observable<boolean> {
        return this.http.get<boolean>(
            environment.apiHost + "review/" + touristId + "/" + tourId,
        );
    }
    addReview(review: Review): Observable<Review> {
        return this.http.post<Review>(environment.apiHost + "review", review);
    }
    updateReview(review: Review): Observable<Review> {
        return this.http.put<Review>(
            environment.apiHost + "review/" + review.id,
            review,
        );
    }
    deleteReview(review: Review): Observable<Review> {
        return this.http.delete<Review>(
            environment.apiHost + "review/" + review.id,
        );
    }
    getProblem(): Observable<PagedResults<Problem>> {
        return this.http.get<PagedResults<Problem>>(
            environment.apiHost + "tourist/problem/all",
        );
    }
    addProblem(problem: Problem): Observable<Problem> {
        return this.http.post<Problem>(
            environment.apiHost + "tourist/problem",
            problem,
        );
    }
    updateProblem(problem: Problem): Observable<Problem> {
        return this.http.put<Problem>(
            environment.apiHost + "tourist/problem/" + problem.id,
            problem,
        );
    }
    deleteProblem(id: number): Observable<Problem> {
        return this.http.delete<Problem>(
            environment.apiHost + "tourist/problem/" + id,
        );
    }
    getProblemByUserId(): Observable<PagedResults<Problem>> {
        return this.http.get<PagedResults<Problem>>(
            environment.apiHost + "tourist/problem/",
        );
    }
    getClubById(id: number): Observable<Club> {
        return this.http.get<Club>(environment.apiHost + "tourist/club/" + id);
    }
    getClubs(): Observable<PagedResults<Club>> {
        return this.http.get<PagedResults<Club>>(
            environment.apiHost + "tourist/club",
        );
    }
    getOwnerClubs(): Observable<PagedResults<Club>> {
        return this.http.get<PagedResults<Club>>(
            environment.apiHost + "tourist/club/ownerclubs",
        );
    }
    addClub(club: Club): Observable<Club> {
        return this.http.post<Club>(environment.apiHost + "tourist/club", club);
    }
    updateClub(club: Club): Observable<Club> {
        return this.http.put<Club>(environment.apiHost + "tourist/club/", club);
    }
    deleteClub(id: number): any {
        return this.http.delete<any>(
            environment.apiHost + "tourist/club/" + id,
        );
    }
    getMyClubJoinRequests(): Observable<PagedResults<MyClubJoinRequest>> {
        const route = `${environment.apiHost}tourist/club-join-request/tourist?page=1&pageSize=1000`;
        return this.http.get<PagedResults<MyClubJoinRequest>>(route);
    }
    cancelClubJoinRequest(id: number): Observable<HttpResponse<any>> {
        const route = `${environment.apiHost}tourist/club-join-request/${id}`;
        return this.http.delete(route, { observe: "response" });
    }
    respondClubJoinRequest(
        id: number,
        accepted: boolean,
    ): Observable<HttpResponse<any>> {
        const route = `${environment.apiHost}tourist/club-join-request/${id}`;
        return this.http.patch(
            route,
            { Accepted: accepted },
            { observe: "response" },
        );
    }
    getClubJoinRequestsByClub(
        id: number,
    ): Observable<PagedResults<ClubJoinRequest>> {
        const route = `${environment.apiHost}tourist/club-join-request/club/${id}?page=1&pageSize=1000`;
        return this.http.get<PagedResults<ClubJoinRequest>>(route);
    }
    sendClubJoinRequest(
        touristId: number,
        clubId: number,
    ): Observable<HttpResponse<any>> {
        const route = `${environment.apiHost}tourist/club-join-request`;
        const body = { TouristId: touristId, ClubId: clubId };
        return this.http.post<PagedResults<ClubJoinRequest>>(route, body, {
            observe: "response",
        });
    }
    getClubMembers(clubId: number): Observable<PagedResults<ClubMember>> {
        return this.http.get<PagedResults<ClubMember>>(
            environment.apiHost + `tourist/club/members/${clubId}`,
        );
    }
    kickMember(id: number): Observable<ClubMember> {
        const route = environment.apiHost + "tourist/club/members/kick/" + id;
        return this.http.delete<ClubMember>(route);
    }
    inviteMember(
        invitation: ClubInvitationUsername,
    ): Observable<HttpResponse<any>> {
        const route = environment.apiHost + "tourist/club/invite/byUsername";
        const body: ClubInvitationUsername = {
            username: invitation.username,
            clubId: invitation.clubId,
        };
        return this.http.post<PagedResults<ClubInvitationUsername>>(
            route,
            body,
            { observe: "response" },
        );
    }
    getInvitations(): Observable<
        PagedResults<ClubInvitationWithClubAndOwnerName>
    > {
        const route =
            environment.apiHost + "tourist/club/invite/my-invitations";
        return this.http.get<PagedResults<ClubInvitationWithClubAndOwnerName>>(
            route,
        );
    }
    acceptInvite(invitationId: number): Observable<any> {
        const route =
            environment.apiHost + "tourist/club/invite/accept/" + invitationId;
        return this.http.patch<any>(route, { observe: "response" });
    }
    getClubBlogs(clubId: number): Observable<Blog[]> {
        return this.http.get<Blog[]>(
            environment.apiHost +
                "blog/getClubBlogs?page=0&pageSize=0&clubId=" +
                clubId,
        );
    }
    rejectInvite(invitationId: number): Observable<any> {
        const route =
            environment.apiHost + "tourist/club/invite/reject/" + invitationId;
        return this.http.patch<any>(route, { observe: "response" });
    }
    findNearbyTours(
        longitude: number,
        latitude: number,
        distance: number,
    ): Observable<PagedResults<Tour>> {
        const route = `${environment.apiHost}tourist/tour?longitude=${longitude}&latitude=${latitude}&maxDistance=${distance}`;
        return this.http.get<PagedResults<Tour>>(route);
    }
    getFacilityNotificationsByAuthorId(): Observable<
        PagedResults<FacilityNotification>
    > {
        return this.http.get<PagedResults<FacilityNotification>>(
            environment.apiHost + "notifications",
        );
    }
    getKeyPointNotificationsByAuthorId(): Observable<
        PagedResults<KeyPointNotification>
    > {
        return this.http.get<PagedResults<KeyPointNotification>>(
            environment.apiHost + "notifications/keypoint",
        );
    }

    getPublicKeyPoints(): Observable<PagedResults<PublicKeyPoint>> {
        return this.http.get<PagedResults<PublicKeyPoint>>(
            environment.apiHost + "tourist/publicKeyPoint",
        );
    }

    getPublicFacilities(): Observable<PagedResults<PublicFacilities>> {
        return this.http.get<PagedResults<PublicFacilities>>(
            environment.apiHost + "tourist/facility/public",
        );
    }
    getPublishedTours(): Observable<Tour[]> {
        return this.http.get<Tour[]>(
            environment.apiHost + "market-place/tours/published",
        );
    }

    getToursFirstKeyPoint(tourId: number): Observable<KeyPoint> {
        return this.http.get<KeyPoint>(
            environment.apiHost +
                "market-place/tours/" +
                tourId +
                "/first-key-point",
        );
    }

    addBundleOrderItem(bundleOrderItem: BundleOrderItem): Observable<any> {
        return this.http.post<any>(
            environment.apiHost + "tourist/shoppingCart/add-bundle/",
            bundleOrderItem,
        );
    }

    addShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
        return this.http.post<ShoppingCart>(
            environment.apiHost + "tourist/shoppingCart/",
            shoppingCart,
        );
    }

    getShoppingCart(id: number): Observable<ShoppingCart> {
        return this.http
            .get<ShoppingCart>(
                environment.apiHost + "tourist/shoppingCart/" + id,
            )
            .pipe(
                tap(shoppingCart => {
                    this.setCart(shoppingCart);
                }),
            );
    }

    setCart(shoppingCart: ShoppingCart) {
        this.cart$.next(shoppingCart);
    }

    addOrderItem(orderItem: any): Observable<any> {
        return this.http.post<any>(
            environment.apiHost + "tourist/shoppingCart/addItem",
            orderItem,
        );
    }

    getToursInCart(id: number): Observable<Tour[]> {
        return this.http.get<Tour[]>(
            environment.apiHost + "market-place/tours/inCart/" + id,
        );
    }

    getOrderItem(tourId: number, touristId: number): Observable<any> {
        return this.http.get<any>(
            environment.apiHost +
                "tourist/shoppingCart/getItem/" +
                tourId +
                "/" +
                touristId,
        );
    }
    removeOrderItem(
        id: number | undefined,
        shoppingCartId: number | undefined,
    ): any {
        this.cart$.value.orderItems?.splice(
            this.cart$.value.orderItems?.findIndex(x => x.id === id),
            1,
        );
        this.setCart(this.cart$.value);
        return this.http.delete<any>(
            environment.apiHost +
                "tourist/shoppingCart/removeItem/" +
                id +
                "/" +
                shoppingCartId,
        );
    }
    addToken(
        tourId: number,
        touristId: number,
        totalPrice: number,
        orderItemPrice: number,
    ): Promise<TourToken | undefined> {
        return this.http
            .post<TourToken>(
                environment.apiHost +
                    "token/" +
                    tourId +
                    "/" +
                    touristId +
                    "/" +
                    totalPrice +
                    "/" +
                    orderItemPrice,
                {},
            )
            .toPromise();
    }

    deleteShoppingKart(shoppingKartId: number | undefined): any {
        return this.http.delete(
            environment.apiHost + "tourist/shoppingCart/" + shoppingKartId,
        );
    }

    getTouristTokens(): Observable<Array<TourToken>> {
        return this.http.get<Array<TourToken>>(
            environment.apiHost + "token/tourists/",
        );
    }

    getTourById(tourId: number): Observable<Tour> {
        const route: string =
            environment.apiHost + "market-place/tours/" + tourId;
        return this.http.get<Tour>(route);
    }

    canTourBeRated(tourId: number): Observable<boolean> {
        const route: string =
            environment.apiHost + "market-place/tours/can-be-rated/" + tourId;
        return this.http.get<boolean>(route);
    }

    searchTours(
        searchFilter: any,
        sortOption: SortOption,
    ): Observable<PagedResults<Tour>> {
        let query = this.prepareSearchQuery(searchFilter, sortOption);
        console.log(query);
        const path = environment.apiHost + "tourist/tour/search" + query;
        return this.http.get<PagedResults<Tour>>(path);
    }

    prepareSearchQuery(searchFilter: any, sortOption: SortOption): String {
        let query = `?page=${searchFilter.page}&pageSize=${searchFilter.pageSize}`;
        query += searchFilter.name != "" ? `&name=${searchFilter.name}` : "";
        query +=
            searchFilter.minPrice >= 0 && searchFilter.minPrice !== ""
                ? `&minPrice=${searchFilter.minPrice}`
                : "";
        query +=
            searchFilter.maxPrice >= 0 && searchFilter.maxPrice !== ""
                ? `&maxPrice=${searchFilter.maxPrice}`
                : "";
        query +=
            searchFilter.onDiscount != false
                ? `&onDiscount=${searchFilter.onDiscount}`
                : "";
        query +=
            searchFilter.minDifficulty >= 0 && searchFilter.minDifficulty !== ""
                ? `&minDifficulty=${searchFilter.minDifficulty}`
                : "";
        query +=
            searchFilter.maxDifficulty >= 0 && searchFilter.maxDifficulty !== ""
                ? `&maxDifficulty=${searchFilter.maxDifficulty}`
                : "";
        query +=
            searchFilter.minDuration >= 0 && searchFilter.minDuration !== ""
                ? `&minDuration=${searchFilter.minDuration}`
                : "";
        query +=
            searchFilter.maxDuration >= 0 && searchFilter.maxDuration !== ""
                ? `&maxDuration=${searchFilter.maxDuration}`
                : "";
        query +=
            searchFilter.minAverageRating >= 0 &&
            searchFilter.minAverageRating !== ""
                ? `&minAverageRating=${searchFilter.minAverageRating}`
                : "";
        query +=
            searchFilter.minLength >= 0 && searchFilter.minLength !== ""
                ? `&minLength=${searchFilter.minLength}`
                : "";
        query +=
            searchFilter.maxLength >= 0 && searchFilter.maxLength !== ""
                ? `&maxLength=${searchFilter.maxLength}`
                : "";
        query +=
            searchFilter.longitude >= -180 && searchFilter.longitude !== ""
                ? `&longitude=${searchFilter.longitude}`
                : "";
        query +=
            searchFilter.latitude >= -180 && searchFilter.latitude !== ""
                ? `&latitude=${searchFilter.latitude}`
                : "";
        query +=
            searchFilter.distance > 0 && searchFilter.distance !== ""
                ? `&maxDistance=${searchFilter.distance}`
                : "";
        query += sortOption != SortOption.NoSort ? `&sortBy=${sortOption}` : "";
        return query;
    }

    addTourSale(tourSale: TourSale): Observable<TourSale> {
        return this.http.post<TourSale>(
            environment.apiHost + "tour-sales",
            tourSale,
        );
    }

    getTourSales(): Observable<TourSale[]> {
        return this.http.get<TourSale[]>(environment.apiHost + "tour-sales");
    }

    getTourSaleById(id: number): Observable<TourSale> {
        return this.http.get<TourSale>(
            environment.apiHost + "tour-sales/" + id,
        );
    }

    updateTourSale(tourSale: TourSale): Observable<TourSale> {
        return this.http.put<TourSale>(
            environment.apiHost + "tour-sales",
            tourSale,
        );
    }

    deleteTourSale(id: number): Observable<void> {
        return this.http.delete<void>(environment.apiHost + "tour-sales/" + id);
    }

    getDiscountForTour(tourId: number): Observable<number | null> {
        return this.http.get<number | null>(
            environment.apiHost + "tour-sales/tours/" + tourId,
        );
    }

    getPublishedToursByAuthor(
        authorId: number,
    ): Observable<PagedResults<Tour>> {
        const path =
            environment.apiHost +
            "tourist/tour/search" +
            "?page=0&pageSize=0&authorId=" +
            authorId;
        return this.http.get<PagedResults<Tour>>(path);
    }

    addCoupon(coupon: Coupon): Observable<Coupon> {
        return this.http.post<Coupon>(environment.apiHost + "coupon/", coupon);
    }

    getCouponsById(authorId: number): Observable<PagedResults<Coupon>> {
        return this.http.get<PagedResults<Coupon>>(
            environment.apiHost + "coupon/" + authorId,
        );
    }

    deleteCoupon(id: number): Observable<Coupon> {
        return this.http.delete<Coupon>(environment.apiHost + "coupon/" + id);
    }

    updateCoupon(coupon: Coupon): Observable<Coupon> {
        return this.http.put<Coupon>(
            environment.apiHost + "coupon/" + coupon.id,
            coupon,
        );
    }

    applyDiscount(
        couponAplication: CouponApplication,
    ): Observable<ShoppingCart> {
        return this.http.post<ShoppingCart>(
            environment.apiHost + "tourist/shoppingCart/apply-coupon",
            couponAplication,
        );
    }

    getPublishedBundles(): Observable<Bundle[]> {
        let path = environment.apiHost + "tourist/bundles";
        return this.http.get<Bundle[]>(path);
    }

    getBundleById(bundleId: number): Observable<Bundle> {
        let path = environment.apiHost + "tourist/bundles/" + bundleId;
        return this.http.get<Bundle>(path);
    }

    removeBundleOrderItem(bundleOrderItemId: number): Observable<any> {
        let path =
            environment.apiHost +
            "tourist/shoppingCart/remove-bundle-item/" +
            bundleOrderItemId;
        return this.http.delete<any>(path);
    }

    buyBundle(bundleId: number): Observable<any> {
        console.log("6");
        let path = environment.apiHost + "token/bundle/" + bundleId;
        return this.http.post<any>(path, {});
    }

    getMailingListSubscribeStatus(userId: number): Observable<Subscription> {
        const path =
            environment.apiHost + "tourist/subscriber/by-user/" + userId;
        return this.http.get<Subscription>(path);
    }
    addTourToWishlist(tourId: number): Observable<Wishlist> {
        return this.http.post<Wishlist>(
            environment.apiHost + "wishlist/" + tourId,
            tourId,
        );
    }

    getToursFromWishlist(): Observable<Tour[]> {
        return this.http.get<Tour[]>(environment.apiHost + "wishlist/tourist");
    }

    removeTourFromWishList(tourId: number): Observable<Wishlist> {
        return this.http.delete<Wishlist>(
            environment.apiHost + "wishlist/" + tourId,
        );
    }

    getActiveTours(): Observable<PagedResults<Tour>> {
        return this.http.get<PagedResults<Tour>>(
            environment.apiHost + "tourist/tourrecommenders/activetours",
        );
    }

    getRecommendedTours(): Observable<PagedResults<Tour>> {
        return this.http.get<PagedResults<Tour>>(
            environment.apiHost + "tourist/tourrecommenders/recommendedtours",
        );
    }
}
