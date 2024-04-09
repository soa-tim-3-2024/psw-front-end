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
}
@Component({
    selector: "xp-follower-search-dialog",
    templateUrl: "./follower-search-dialog.component.html",
    styleUrls: ["./follower-search-dialog.component.css"],
})
export class FollowerSearchDialogComponent implements OnInit {
    userId: number;
    username: string;
    faSearch = faSearch;
    users: UserFollow[] = [];
    followings: UserFollowing[] = [];
    searchUsername: string;
    constructor(
        private service: StakeholderService,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit(): void {
        this.userId = this.data.userId;
        this.username = this.data.username;
        this.loadFollowings();
    }
    loadFollowings() {
        this.service.getUserFollowings(this.userId.toString()).subscribe(result => {
            this.followings = result;
        });
    }
    follow(id: number) {
        var clicked = this.users.find(u => u.id == id);
        if (clicked != undefined) {
            const followCreate1: NewFollowing = {
                userId: this.userId.toString(),
                username: this.username,
                profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                followingUserId: clicked.id.toString(),
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
    search() {
        this.service.getSearched(this.searchUsername).subscribe(result => {
            this.users = result.results;
            this.users.forEach(user => {
                if (this.followings.some(f => user.id.toString() == f.userId)) {
                    user.followingStatus = true;
                } else {
                    user.followingStatus = false;
                }
            });
        });
    }
}
