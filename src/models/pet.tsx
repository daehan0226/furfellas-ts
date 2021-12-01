export default interface Pet {
    id: number,
    title: string,
    birthday: string,
    weight: number,
    name: string,
    intro: string,
    photo: {
        id: number,
        url: string
    }
}
