import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserFollow } from "../model/user-follow.model";
import { StakeholderService } from "../stakeholder.service";
import { Following } from "../model/following.model";
import { FollowerCreate } from "../model/follower-create.model";
import { NewFollowing } from "../model/new-following.mode";
import { UserFollowing } from "../model/user-following.model";
export interface ModalData {
    userId: number;
    username: string;
    users: UserFollowing[];
    followings: UserFollowing[];
}
@Component({
    selector: "xp-follower-search-dialog",
    templateUrl: "./follower-recommendation-dialog.component.html",
    styleUrls: ["./follower-recommendation-dialog.component.css"],
})
export class FollowerRecommendationDialogComponent implements OnInit {
    userId: number;
    username: string;
    faSearch = faSearch;
    showTable: boolean=false;
    users: UserFollowing[] = [];
    followings: UserFollowing[] = [];
    constructor(
        private service: StakeholderService,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit(): void {
        this.userId = this.data.userId;
        this.username = this.data.username;
        this.users = this.data.users;
        this.followings = this.data.followings;
        this.showTable=true;
        this.loadFollowings();
        this.loadRecommendations();
        console.log(this.users)
        console.log(this.followings)
        console.log(this.userId)
    }
    loadFollowings() {
        this.service.getUserFollowings(this.userId.toString()).subscribe(result => {
            this.followings = result;
        });
    }


    loadRecommendations() {
        this.service.getUserRecommendations(this.userId.toString()).subscribe(result => {
            this.users = result;
            this.users.forEach(user => {
                    user.followingStatus = false;
            });
        });
        console.log(this.users)
    }


    follow(id: string) {
        var clicked = this.users.find(u => u.userId == id);
        if (clicked != undefined) {
            const followCreate1: NewFollowing = {
                userId: this.userId.toString(),
                username: this.username,
                profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                followingUserId: clicked.userId,
                followingUsername: clicked.username,
                followingProfileImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
            };
            this.service.createNewFollowing(followCreate1).subscribe({
                next: (result: any) => {
                    if (clicked != undefined) {
                        clicked.followingStatus = true;
                        this.loadFollowings();
                    }
                },
            });
        }
    }

}
