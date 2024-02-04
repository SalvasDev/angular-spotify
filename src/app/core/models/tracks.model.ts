import { ArtistModel } from "./atist.model";

export interface TrackModel {
    name: string;
    album: string;
    cover: string;
    url: string;
    _id: string | number;
    artist?: ArtistModel;
}
