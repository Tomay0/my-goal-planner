import { Task } from './goal';


export interface Progress {
    [taskID: number]: number
};

export interface ProgressList {
    [date: string]: Progress
};

export function isProgressList(arg: any): arg is ProgressList {
    const progressList: ProgressList = arg;

    return true;
}