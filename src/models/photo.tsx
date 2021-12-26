import { Action, Pet, Location, User } from "./";

export interface Photo {
    id: number;
    actions: Action[];
    create_datetime: string;
    description: string;
    image_id?: string;
    location: Location;
    original?: string;
    pets: Pet[];
    thumbnail?: string;
    upload_datetime?: string;
    user?: User;
    key?: number;
    file?: File | null;
}


export interface PhotoTable {
    id: number;
    actions: Action[] | null;
    create_datetime: string;
    description: string;
    location: Location | null;
    pets: Pet[] | null;
    key: number;
    file: File | null;
}