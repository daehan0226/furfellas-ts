import HttpClient from './http-client';
import { Pet, Todo, Action, Location, Photo } from '../models';

export interface IResponse {
    status: 200 | 201 | 204 | 400 | 401 | 404 | 403 | 500,
}

export interface GetActionResponse extends IResponse {
    data: {
        result: Action[];
        message: string;
    }
}

export interface AddActionResponse extends IResponse {
    data: {
        result: number;
        message: string;
    }
};

export interface UpdateActionResponse extends IResponse {
    data: {
        message: string;
    }
};

export interface DeleteActionResponse extends IResponse {
    data: {
        message: string;
    }
}

export interface GetLocationResponse extends IResponse {
    data: {
        result: Location[];
        message: string;
    }
};

export interface GetPetResponse extends IResponse {
    data: {
        result: Pet[];
        message: string;
    }
};

export interface GetTodoResponse extends IResponse {
    data: {
        result: Todo[];
        message: string;
    }
};

export interface GetPhotoResponse extends IResponse {
    data: {
        result: Photo[]
        message: string;
    }
}

class MainApi extends HttpClient {
    public constructor() {
        super('http://13.125.226.150:16999/api/');
    }

    public getPets = () => this.instance.get<any, GetPetResponse>('pets/');
    public getLocations = () => this.instance.get<any, GetLocationResponse>('locations/');
    public getPhotos = (queryParams: string) => this.instance.get<any, GetPhotoResponse>(`photos/?${queryParams}`);

    public getActions = () => this.instance.get<any, GetActionResponse>('actions/');
    public addAction = (queryParams: string) => this.instance.post<any, AddActionResponse>(`actions/?${queryParams}`);
    public updateAction = (id: number, queryParams: string) => this.instance.put<any, UpdateActionResponse>(`actions/${id}?${queryParams}`);
    public deleteAction = (id: number) => this.instance.delete<any, DeleteActionResponse>(`actions/${id}`);

    public getPet = (id: string) => this.instance.get<Pet>(`pets/${id}`);

    public getTodos = (queryParams: string) => this.instance.get<any, GetTodoResponse>(`todos/?${queryParams}`);
}

export default MainApi