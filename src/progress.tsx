export interface ProgressHash {
    [taskID: number]: number;
}

export interface Progress {
    date: string;
    tasks: ProgressHash;
};

export interface ProgressList {
    [date: string]: Progress;
};

export function formatDate(d: Date) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function isProgressList(arg: any): arg is ProgressList {
    return true;
}