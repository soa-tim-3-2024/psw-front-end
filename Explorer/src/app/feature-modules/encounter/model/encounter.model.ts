export interface Encounter {
    id: number;
    title: string;
    description: string;
    picture: string;
    longitude: number;
    latitude: number;
    radius: number;
    xpReward: number;
    status: EncounterStatus;
    type: EncounterType;
    peopleNumber?: number;
    pictureLongitude?: number;
    pictureLatitude?: number;
    tourId?: number;
    challengeDone: boolean;
    instances?: number[];
}

export enum EncounterType {
    Social,
    Hidden,
    Misc,
    KeyPoint,
}
export enum EncounterStatus {
    Active,
    Draft,
    Archieved,
}
