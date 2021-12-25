import { Moment } from "moment"

export default interface Pet {
    id: number,
    birthday: string | Moment,
    weight: number,
    name: string,
    intro: string,
    sex: string,
    photo: {
        id: number,
        url: string
    },
    color: string
}
