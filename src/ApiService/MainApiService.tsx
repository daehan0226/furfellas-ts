import HttpClient from './http-client';
import { Pet } from '../models';


type GetPetResponse = {
    result: Pet[];
    message: "Success" | "Fail";
};

type test = {
    id: number
}

class MainApi extends HttpClient {
    public constructor() {
        super('http://13.125.226.150:16999/api/');
    }

    public getPets = () => this.instance.get<any, GetPetResponse>('pets/');

    public getPet = (id: string) => this.instance.get<Pet>(`pets/${id}`);
}

export default MainApi