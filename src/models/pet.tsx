export default interface Pet {
    title: string,
    birthday: string,
    weight: number,
    name: string,
    intro: string,
    photo?: {
        id: number,
        url: string
    }
}
