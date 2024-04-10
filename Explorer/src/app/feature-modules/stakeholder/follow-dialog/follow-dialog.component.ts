import { Component, Inject, OnInit } from "@angular/core";
import { Follower } from "../model/follower.model";
import { Following } from "../model/following.model";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { User } from "src/app/infrastructure/auth/model/user.model";
import { MessageDialogComponent } from "../message-dialog/message-dialog/message-dialog.component";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { StakeholderService } from "../stakeholder.service";
import { FollowerCreate } from "../model/follower-create.model";
import { UserFollowing } from "../model/user-following.model";
import { NewFollowing } from "../model/new-following.mode";
import { UnfollowUser } from "../model/unfollow-user.model";
export interface ModalData {
    followers: UserFollowing[];
    followings: UserFollowing[];
    showFollowers: boolean;
    showFollowings: boolean;
    user: User;
    followingsCount: number;
}
@Component({
    selector: "xp-follow-dialog",
    templateUrl: "./follow-dialog.component.html",
    styleUrls: ["./follow-dialog.component.css"],
})
export class FollowDialogComponent implements OnInit {
    userId: number;
    user: User;
    followers: UserFollowing[] = [];
    followings: UserFollowing[] = [];
    showFollowers: boolean = false;
    showFollowings: boolean = false;
    f: FollowerCreate;
    constructor(
        private service: StakeholderService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) {}

    ngOnInit(): void {
        this.user = this.data.user
        this.followers = this.data.followers;
        this.followings = this.data.followings;
        this.showFollowers = this.data.showFollowers;
        this.showFollowings = this.data.showFollowings;
        this.userId = this.data.user.id;
        this.followers.forEach(item => {
            if(this.followings.find(f => f.userId == item.userId)){
                item.followingStatus = true
            }
        });
    }

    unfollowOrFollow(id: number): void {
        var clicked = this.followers.find(f => f.userId == id.toString());
        if (clicked == undefined) {
            clicked = this.followings.find(f => f.userId == id.toString());
        }
        if (clicked != undefined) {
            if (!clicked.followingStatus) {
                const followCreate1: NewFollowing = {
                    userId: this.userId.toString(),
                    username: this.user.username,
                    profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
                    followingUserId: clicked.userId.toString(),
                    followingUsername: clicked.username,
                    followingProfileImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                };
                this.service.createNewFollowing(followCreate1).subscribe({
                    next: (result: any) => {
                        if (clicked != undefined) {
                            clicked.followingStatus = true;
                            this.followings.push(clicked)
                        }
                    },
                });    
            }else{
                const unfollow: UnfollowUser = {
                    userId: this.userId.toString(),
                    userToUnfollowId: clicked.userId.toString()
                }
                this.service.unfollowUser(unfollow).subscribe({
                    next: (result: any) => {
                        if (clicked != undefined) {
                            clicked.followingStatus = false;
                            this.followings = this.followings.filter(f => f.userId != clicked?.userId)
                        }
                    },
                });
            }
        }
    }
}
