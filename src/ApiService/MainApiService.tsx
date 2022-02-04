import HttpClient from "./http-client";
import { Pet, Todo, Action, Location, Photo } from "../models";
import Cookies from "universal-cookie";

export interface IResponse {
  status: 200 | 201 | 202 | 204 | 400 | 401 | 404 | 403 | 500;
}

export interface AddSessionResponse extends IResponse {
  data: {
    result?: any;
    message: string;
  };
}

export interface ValidateSessionResponse extends IResponse {
  data: {
    result?: any;
    message: string;
  };
}

export interface GetActionResponse extends IResponse {
  data: {
    result: Action[];
    message: string;
  };
}

export interface AddResponse extends IResponse {
  data: {
    result: number;
    message: string;
  };
}

export interface UpdateResponse extends IResponse {
  data: {
    message: string;
  };
}

export interface GetLocationResponse extends IResponse {
  data: {
    result: Location[];
    message: string;
  };
}

export interface DeleteResponse extends IResponse {
  data: {
    message: string;
  };
}

export interface GetPetResponse extends IResponse {
  data: {
    result: Pet[];
    message: string;
  };
}

export interface GetTodoResponse extends IResponse {
  data: {
    result: Todo[];
    message: string;
  };
}

export interface GetPhotoResponse extends IResponse {
  data: {
    result: Photo[];
    message: string;
  };
}

class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public constructor() {
    super(process.env.REACT_APP_API_ADDRESS);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }

  private _createPhotoFormData = (data: any) => {
    let formData = new FormData();

    if (data.file) {
      formData.append("file", data.file);
    }
    formData.append("pet_ids", data.pets);
    formData.append("action_ids", data.actions);
    formData.append("location_id", data.location);
    formData.append("description", data.description);
    formData.append("create_datetime", data.create_datetime);
    return formData;
  };

  private _getSession = () => {
    const cookies = new Cookies();
    return { Authorization: cookies.get("EID_SES") };
  };

  public getPhotos = (queryParams: string) =>
    this.instance.get<any, GetPhotoResponse>(`photos/?${queryParams}`, {
      headers: this._getSession(),
    });
  public addPhoto = (data: any) =>
    this.instance.post<any, AddResponse>(
      `photos/`,
      this._createPhotoFormData(data),
      { headers: this._getSession() }
    );
  public updatePhoto = (id: number, data: any) =>
    this.instance.put<any, UpdateResponse>(
      `photos/${id}?${this._createPhotoFormData(data)}`,
      { headers: this._getSession() }
    );
  public deletePhoto = (id: number) =>
    this.instance.delete<any, DeleteResponse>(`photos/${id}`, {
      headers: this._getSession(),
    });

  public loginGoogleUser = (token: any) =>
    this.instance.post<any, AddSessionResponse>(
      `oauth_users/`,
      { provider_type: "google" },
      { headers: { Authorization: token } }
    );

  public addSession = (data: { username: string; password: string }) =>
    this.instance.post<any, AddSessionResponse>(`sessions/`, data, {
      headers: this._getSession(),
    });
  public validateSession = () =>
    this.instance.get<any, ValidateSessionResponse>(`sessions/validate`, {
      headers: this._getSession(),
    });
  public deleteSession = () =>
    this.instance.delete<any, DeleteResponse>(`sessions/`, {
      headers: this._getSession(),
    });

  public getLocations = () =>
    this.instance.get<any, GetLocationResponse>("locations/", {
      headers: this._getSession(),
    });
  public addLocation = (queryParams: string) =>
    this.instance.post<any, AddResponse>(
      `locations/?${queryParams}`,
      {},
      { headers: this._getSession() }
    );
  public updateLocation = (id: number, queryParams: string) =>
    this.instance.put<any, UpdateResponse>(
      `locations/${id}?${queryParams}`,
      {},
      { headers: this._getSession() }
    );
  public deleteLocation = (id: number) =>
    this.instance.delete<any, DeleteResponse>(`locations/${id}`, {
      headers: this._getSession(),
    });

  public getActions = () =>
    this.instance.get<any, GetActionResponse>("actions/", {
      headers: this._getSession(),
    });
  public addAction = (queryParams: string) =>
    this.instance.post<any, AddResponse>(
      `actions/?${queryParams}`,
      {},
      { headers: this._getSession() }
    );
  public updateAction = (id: number, queryParams: string) =>
    this.instance.put<any, UpdateResponse>(
      `actions/${id}?${queryParams}`,
      {},
      { headers: this._getSession() }
    );
  public deleteAction = (id: number) =>
    this.instance.delete<any, DeleteResponse>(`actions/${id}`, {
      headers: this._getSession(),
    });

  public getPets = () =>
    this.instance.get<any, GetPetResponse>("pets/", {
      headers: this._getSession(),
    });
  public getPet = (id: number) =>
    this.instance.get<Pet>(`pets/${id}`, { headers: this._getSession() });
  public deletePet = (id: number) =>
    this.instance.delete<any, DeleteResponse>(`pets/${id}`, {
      headers: this._getSession(),
    });

  public getTodos = (queryParams: string) =>
    this.instance.get<any, GetTodoResponse>(`todos/?${queryParams}`);
}

export default MainApi;
