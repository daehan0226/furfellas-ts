export const sortObjectsByStringKey = <T,>(objs: T[], objKey: string, order: string = "ascend"): T[] => {
    let sorted: T[];
    if (order === "descend") {
        sorted = objs.sort((a: any, b: any) => (a[objKey] < b[objKey] ? 1 : -1));
    } else {
        sorted = objs.sort((a: any, b: any) => (a[objKey] > b[objKey] ? 1 : -1));
    }
    return sorted
}


export const getCurrentStringDate = (): string => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date;
}


export const addMonthToCurrentDate = (months: number): Date => {
    const today = new Date();
    const d = today.getDate();
    today.setMonth(today.getMonth() + months);
    if (today.getDate() !== d) {
        today.setDate(0);
    }
    return today;
}

export const strfDatetime = (datetime: Date): string => {
    return datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate();
}

export const createQueryParams = (params: { [k: string]: string | number }) => {
    return Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
};

