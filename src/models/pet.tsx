export default interface Pet {
    id: number,
    birthday: string,
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
