import HttpClient from './http-client';
import { Pet, Todo, Action, Location, User } from '../models';


type GetActionResponse = {
    result: Action[];
    message: "Success" | "Fail";
};

type AddActionResponse = {
    result: number;
    message: "CREATED" | "No permission" | "Fail"
};

type GetLocationResponse = {
    result: Location[];
    message: "Success" | "Fail";
};

type GetPetResponse = {
    result: Pet[];
    message: "Success" | "Fail";
};

type GetTodoResponse = {
    result: Todo[];
    message: "Success" | "Fail";
};

interface GetPhotoResponse {
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
    user: User
}

class MainApi extends HttpClient {
    public constructor() {
        super('http://13.125.226.150:16999/api/');
    }

    public getPets = () => this.instance.get<any, GetPetResponse>('pets/');
    public getActions = () => this.instance.get<any, GetActionResponse>('actions/');
    public getLocations = () => this.instance.get<any, GetLocationResponse>('locations/');
    public getPhotos = (queryParams: string) => this.instance.get<any, GetPhotoResponse>(`photos/?${queryParams}`);

    public addAction = (queryParams: string) => this.instance.post<any, AddActionResponse>(`actions/?${queryParams}`);

    public getPet = (id: string) => this.instance.get<Pet>(`pets/${id}`);

    public getTodos = (queryParams: string) => this.instance.get<any, GetTodoResponse>(`todos/?${queryParams}`);
}

export default MainApi