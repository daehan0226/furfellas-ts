import HttpClient from './http-client';
import { Pet, Todo, Action, Location, Photo } from '../models';
import { createQueryParams } from '../utils/utils';

export interface IResponse {
    status: 200 | 201 | 204 | 400 | 401 | 404 | 403 | 500,
}

export interface AddSessionResponse extends IResponse {
    data: {
        result?: any;
        message: string;
    }
};

export interface ValidateSessionResponse extends IResponse {
    data: {
        result?: any;
        message: string;
    }
};

export interface DeleteSessionResponse extends IResponse {
    data: {
        message: string;
    }
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

export interface AddLocationResponse extends IResponse {
    data: {
        result: number;
        message: string;
    }
};

export interface UpdateLocationResponse extends IResponse {
    data: {
        message: string;
    }
};

export interface DeleteLocationResponse extends IResponse {
    data: {
        message: string;
    }
}


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
    private static classInstance?: MainApi;

    public constructor() {
        super('http://13.125.226.150:16999/api/');
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new MainApi();
        }

        return this.classInstance;
    }

    private _createQueryParams = (data:any) => {
        return createQueryParams(data)
    }

    public getPhotos = (queryParams: string) => this.instance.get<any, GetPhotoResponse>(`photos/?${queryParams}`);
    public addPhoto = (data: any) => this.instance.post<any, AddActionResponse>(`photos/?${this._createQueryParams(data)}`);
    public updatePhoto = (id: number, data: any) => this.instance.put<any, UpdateActionResponse>(`photos/${id}?${this._createQueryParams(data)}`);
    public deletePhoto = (id: number) => this.instance.delete<any, DeleteActionResponse>(`photos/${id}`);

    public addSession = (data: { username: string, password: string }) => this.instance.post<any, AddSessionResponse>(`sessions/`, data);
    public validateSession = () => this.instance.get<any, ValidateSessionResponse>(`sessions/validate`);
    public deleteSession = () => this.instance.delete<any, ValidateSessionResponse>(`sessions/`);

    public getLocations = () => this.instance.get<any, GetLocationResponse>('locations/');
    public addLocation = (queryParams: string) => this.instance.post<any, AddLocationResponse>(`locations/?${queryParams}`);
    public updateLocation = (id: number, queryParams: string) => this.instance.put<any, UpdateLocationResponse>(`locations/${id}?${queryParams}`);
    public deleteLocation = (id: number) => this.instance.delete<any, DeleteLocationResponse>(`locations/${id}`);

    public getActions = () => this.instance.get<any, GetActionResponse>('actions/');
    public addAction = (queryParams: string) => this.instance.post<any, AddActionResponse>(`actions/?${queryParams}`);
    public updateAction = (id: number, queryParams: string) => this.instance.put<any, UpdateActionResponse>(`actions/${id}?${queryParams}`);
    public deleteAction = (id: number) => this.instance.delete<any, DeleteActionResponse>(`actions/${id}`);

    public getPets = () => this.instance.get<any, GetPetResponse>('pets/');
    public getPet = (id: string) => this.instance.get<Pet>(`pets/${id}`);

    public getTodos = (queryParams: string) => this.instance.get<any, GetTodoResponse>(`todos/?${queryParams}`);
}

export default MainApi