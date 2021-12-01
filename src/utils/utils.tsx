const sortObjectsByStringKey = (objs: any[], objKey: string, order: string): object[] => {
    let sorted;
    if (order === "descend") {
        sorted = objs.sort((a: any, b: any) => (a.objKey < b.objKey ? 1 : -1));
    } else {
        sorted = objs.sort((a: any, b: any) => (a.objKey > b.objKey ? 1 : -1));
    }
    return sorted
}

export default sortObjectsByStringKey;