import { Action, Pet, Location, User } from "./";

export default interface Photo {
    id: number;
    action: Action[];
    create_datetime: string;
    description: string;
    image_id: string;
    location: Location;
    original: string;
    pets: Pet[];
    thumbnail: string;
    upload_datetime: string;
    user: User;
}