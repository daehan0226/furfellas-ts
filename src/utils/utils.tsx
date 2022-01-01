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


export const getCurrentStringDatetime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + 'T' + time;
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



export const getParameterByName = (name: string, url: string) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export const changeToDisplayStringDatetime = (datetime: string) => {
    let temp = datetime.replace("T", " ")
    return temp.includes("00:00:00") ? temp.replace("00:00:00", "") : temp;
}