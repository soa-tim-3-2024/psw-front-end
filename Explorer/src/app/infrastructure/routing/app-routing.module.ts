import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { EquipmentComponent } from "src/app/feature-modules/administration/equipment/equipment.component";
import { TourPreferencesComponent } from "src/app/feature-modules/marketplace/tour-preferences/tour-preferences.component";
import { TourPreferenceFormComponent } from "src/app/feature-modules/marketplace/tour-preference-form/tour-preference-form.component";
import { AdminGuard, AuthGuard } from "../auth/auth.guard";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { BlogsComponent } from "src/app/feature-modules/blog/blogs/blogs.component";
import { BlogComponent } from "src/app/feature-modules/blog/blog/blog.component";
import { UsersOverviewComponent } from "src/app/feature-modules/administration/users-overview/users-overview.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/user-profile/user-profile.component";
import { RatingComponent } from "src/app/feature-modules/administration/rating/rating.component";
import { ReviewComponent } from "src/app/feature-modules/marketplace/review/review.component";
import { TourComponent } from "src/app/feature-modules/tour-authoring/tour/tour.component";
import { TourEquipmentFormComponent } from "src/app/feature-modules/tour-authoring/tour-equipment-form/tour-equipment-form.component";
import { EditProfileComponent } from "../../feature-modules/stakeholder/edit-profile/edit-profile.component";
import { OwnerClubsComponent } from "src/app/feature-modules/marketplace/owner-clubs/owner-clubs.component";
import { ClubsComponent } from "src/app/feature-modules/marketplace/clubs/clubs.component";
import { MyClubJoinRequestsComponent } from "src/app/feature-modules/marketplace/my-club-join-requests/my-club-join-requests.component";
import { ClubJoinRequestManagementComponent } from "src/app/feature-modules/marketplace/club-join-request-management/club-join-request-management.component";
import { TouristEquipmentSelectionComponent } from "src/app/feature-modules/layout/tourist-equipment-selection/tourist-equipment-selection.component";
import { ClubMembersManagementComponent } from "src/app/feature-modules/marketplace/club-members-management/club-members-management.component";
import { FacilitiesComponent } from "src/app/feature-modules/tour-authoring/facilities/facilities.component";
import { KeyPointsComponent } from "src/app/feature-modules/tour-authoring/key-points/key-points.component";
import { MyClubInvitationsComponent } from "src/app/feature-modules/marketplace/my-club-invitations/my-club-invitations.component";
import { ProblemsOverviewComponent } from "src/app/feature-modules/stakeholder/problems-overview/problems-overview.component";
import { ProblemAnswerComponent } from "src/app/feature-modules/stakeholder/problem-answer/problem-answer.component";
import { TouristPositionSimulatorComponent } from "src/app/feature-modules/tour-execution/tourist-position-simulator/tourist-position-simulator.component";
import { RequestViewComponent } from "src/app/feature-modules/administration/request-view/request-view.component";
import { PurchasedToursComponent } from "src/app/feature-modules/tour-execution/purchased-tour-cards/purchased-tour-cards.component";
import { TourExecutingComponent } from "src/app/feature-modules/tour-execution/tour-executing/tour-executing.component";
import { BlogFormComponent } from "src/app/feature-modules/blog/blog-form/blog-form.component";
import { MyBlogsComponent } from "src/app/feature-modules/blog/my-blogs/my-blogs.component";
import { TourSearchComponent } from "src/app/feature-modules/marketplace/tour-search/tour-search.component";
import { NotificationTabsComponent } from "src/app/feature-modules/stakeholder/notification-tabs/notification-tabs.component";
import { TourDetailsComponent } from "src/app/feature-modules/marketplace/tour-details/tour-details.component";
import { UserNotificationsComponent } from "src/app/feature-modules/stakeholder/user-notifications/user-notifications.component";
import { TranslateComponent } from "src/app/shared/translate/translate.component";
import { TourCardViewComponent } from "src/app/shared/tour-card-view/tour-card-view.component";
import { ActiveEncounterViewComponent } from "src/app/feature-modules/encounter/active-encounter-view/active-encounter-view.component";
import { TourPageComponent } from "src/app/feature-modules/marketplace/tour-page/tour-page.component";
import { TourSalesComponent } from "src/app/feature-modules/marketplace/tour-sales/tour-sales.component";
import { TourSaleFormComponent } from "src/app/feature-modules/marketplace/tour-sale-form/tour-sale-form.component";
import { PaymentHistoryComponent } from "src/app/feature-modules/stakeholder/payment-history/payment-history.component";
import { TouristsTourComponent } from "src/app/feature-modules/tour-authoring/tourists-tour/tourists-tour.component";
import { TouristsKeyPointsComponent } from "src/app/feature-modules/tour-authoring/tourists-key-points/tourists-key-points.component";
import { TouristsEquipmentComponent } from "src/app/feature-modules/tour-authoring/tourists-equipment/tourists-equipment.component";
import { CouponsViewComponent } from "src/app/feature-modules/marketplace/coupons-view/coupons-view.component";
import { TouristsTourBlogFormComponent } from "src/app/feature-modules/blog/tourists-tour-blog-form/tourists-tour-blog-form.component";
import { EncounterFormComponent } from "src/app/feature-modules/encounter/encounter-form/encounter-form.component";
import { BundleCardComponent } from "src/app/feature-modules/tour-authoring/bundle-card/bundle-card.component";
import { BundlesComponent } from "src/app/feature-modules/tour-authoring/bundles/bundles.component";
import { ExploreBundlesComponent } from "src/app/feature-modules/marketplace/explore-bundles/explore-bundles.component";
import { PageNotFoundComponent } from "src/app/feature-modules/layout/page-not-found/page-not-found.component";
import { TourStatisticsComponent } from "src/app/feature-modules/tour-authoring/tour-statistics/tour-statistics.component";
import { SingleTourStatisticsComponent } from "src/app/feature-modules/tour-authoring/single-tour-statistics/single-tour-statistics.component";
import { ResetPasswordComponent } from "../auth/reset-password/reset-password.component";
import { ResetPasswordEditComponent } from "../auth/reset-password-edit/reset-password-edit.component";
import { ClubPageComponent } from "src/app/feature-modules/marketplace/club-page/club-page.component";
import { WishlistComponent } from "src/app/feature-modules/marketplace/wishlist/wishlist.component";
import { EncounterListComponent } from "src/app/feature-modules/encounter/encounter-list/encounter-list.component";
import { TermsOfServiceComponent } from "src/app/feature-modules/layout/terms-of-service/terms-of-service.component";
import { PrivacyPolicyComponent } from "src/app/feature-modules/layout/privacy-policy/privacy-policy.component";
import { FrequentlyAskedQuestionsComponent } from "src/app/feature-modules/layout/frequently-asked-questions/frequently-asked-questions.component";
import { AboutUsComponent } from "src/app/feature-modules/layout/about-us/about-us.component";
import { CompanyComponent } from "src/app/feature-modules/layout/company/company.component";

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent },
    { path: "user-notifications", component: UserNotificationsComponent },
    {
        path: "equipment",
        component: EquipmentComponent,
        canActivate: [AdminGuard],
    },
    { path: "", component: HomeComponent },
    { path: "ratings", component: RatingComponent, canActivate: [AuthGuard] },
    {
        path: "done-encounter",
        component: EncounterListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "review/:tourId",
        component: ReviewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "problems",
        component: ProblemsOverviewComponent,
        canActivate: [AuthGuard],
    },
    { path: "tours", component: TourComponent, canActivate: [AuthGuard] },
    {
        path: "purchasedtours",
        component: PurchasedToursComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-sales",
        component: TourSalesComponent,
    },
    {
        path: "tour-sale-form/:id",
        component: TourSaleFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tours/equipment/:id",
        component: TourEquipmentFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "facilities",
        component: FacilitiesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour/:id/key-points",
        component: KeyPointsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourist-position-simulator",
        component: TouristPositionSimulatorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-executing/:tourId",
        component: TourExecutingComponent,
        canActivate: [AuthGuard],
    },

    {
        path: "user-management",
        component: UsersOverviewComponent,
        canActivate: [AuthGuard],
    },
    { path: "clubs", component: ClubsComponent, canActivate: [AuthGuard] },
    { path: "blogs", component: BlogsComponent },
    { path: "my-blogs", component: MyBlogsComponent },
    { path: "blog/:blogId", component: BlogComponent },
    { path: "my-blogs/blog-form/:blogId", component: BlogFormComponent },
    { path: "blog-form/:blogId", component: BlogFormComponent },
    { path: "blog-form/:blogId/:clubId", component: BlogFormComponent },
    {
        path: "profile",
        component: UserProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "edit-profile",
        component: EditProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "my-clubs",
        component: OwnerClubsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "clubs",
        component: ClubsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "my-club-join-requests",
        component: MyClubJoinRequestsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club-join-request-management/:clubId",
        component: ClubJoinRequestManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourist-equipment-selection",
        component: TouristEquipmentSelectionComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club-members-management/:clubId",
        component: ClubMembersManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "my-club-invitations",
        component: MyClubInvitationsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club-members-invite-form",
        component: ClubMembersManagementComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-preference",
        component: TourPreferencesComponent,
    },
    {
        path: "tour-preference/tour-preference-form",
        component: TourPreferenceFormComponent,
    },
    {
        path: "problem/problem-comment",
        component: ProblemAnswerComponent,
    },
    {
        path: "public-requests",
        component: RequestViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "notification-tabs",
        component: NotificationTabsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-search",
        component: TourSearchComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "public-requests",
        component: RequestViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "translate",
        component: TranslateComponent,
    },
    {
        path: "tour-card",
        component: TourCardViewComponent,
    },
    { path: "tour-details/:tourId", component: TourDetailsComponent },
    {
        path: "active-encounters",
        component: ActiveEncounterViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourists-tour",
        component: TouristsTourComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour/:id/tourists-key-points",
        component: TouristsKeyPointsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tourists-tour/equipment/:id",
        component: TouristsEquipmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour/:tourId",
        component: TourPageComponent,
    },
    {
        path: "tourists-blog/:tourId",
        component: TouristsTourBlogFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "payment-history",
        component: PaymentHistoryComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "encounter-form",
        component: EncounterFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "coupons",
        component: CouponsViewComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "bundles",
        component: BundlesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "bundle-card",
        component: BundleCardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "explore-bundles",
        component: ExploreBundlesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-statistics",
        component: TourStatisticsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "tour-statistics/:id",
        component: SingleTourStatisticsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "club/:clubId",
        component: ClubPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "wishlist",
        component: WishlistComponent,
        canActivate: [AuthGuard],
    },
    { path: "reset-password", component: ResetPasswordComponent },
    { path: "reset-password-edit", component: ResetPasswordEditComponent },
    { path: "terms-of-service", component: TermsOfServiceComponent },
    { path: "privacy-policy", component: PrivacyPolicyComponent },
    {
        path: "frequently-asked-questions",
        component: FrequentlyAskedQuestionsComponent,
    },
    { path: "about-us", component: AboutUsComponent },
    { path: "company", component: CompanyComponent },
    { path: "**", pathMatch: "full", component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
