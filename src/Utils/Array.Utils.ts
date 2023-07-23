function groupByDate(array: Array<any>, datekey: string | null) {
    const grouped: any = {};

    if (!datekey) {
        return grouped;
    }

    array.forEach((item: any) => {
        const date = new Date(item[datekey]?.split("T")[0]);
        const dateString = date.toDateString();

        if (!grouped[dateString]) {
            grouped[dateString] = [];
        }

        grouped[dateString].push(item);
    });

    return grouped;
}

function groupByMonth(array: Array<any>, datekey: string | null) {
    const grouped: any = {};

    if (!datekey) {
        return grouped;
    }

    array.forEach((item: any) => {
        const date = new Date(item[datekey]?.split("T")[0]);
        const monthString = `${date.getMonth() + 1}-${date.getFullYear()}`;

        if (!grouped[monthString]) {
            grouped[monthString] = [];
        }

        grouped[monthString].push(item);
    });

    return grouped;
}

function groupByYear(array: Array<any>, datekey: string | null) {
    const grouped: any = {};

    if (!datekey) {
        return grouped;
    }

    array.forEach((item: any) => {
        const date = new Date(item[datekey]?.split("T")[0]);
        const yearString = date.getFullYear().toString();

        if (!grouped[yearString]) {
            grouped[yearString] = [];
        }

        grouped[yearString].push(item);
    });

    return grouped;
}

function groupByColumn(array: Array<any>, columnName: string): Array<any> {
    const grouped: any = {};

    array.forEach((item) => {
        const columnValue = item[columnName].toString();

        if (!grouped[columnValue]) {
            grouped[columnValue] = [];
        }

        grouped[columnValue].push(item);
    });

    return grouped;
}

function mergeDataByColumn_Sum(array: Array<any>, columnName: string): number {
    return array.reduce((total: number, item: any) => {
        return Number(total + Number(item[columnName]));
    }, 0);
}

export {
    groupByColumn,
    groupByDate,
    groupByMonth,
    groupByYear,
    mergeDataByColumn_Sum,
};
