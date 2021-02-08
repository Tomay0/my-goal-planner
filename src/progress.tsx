import { todayOutline, warning } from 'ionicons/icons';
import { CompletionRate, GoalList, isDurationTask } from './goal';

export enum ProgressAchievement {
    NoData = 0,
    InProgress = 1,
    NotAchieved = 2,
    Achieved = 3
}

export type TaskProgress = {
    taskID: number, expected: number, actual: number
}

export function getWeekProgress(startDate: Date, progressList: ProgressList, goalList: GoalList) {
    const roundedStartDate = new Date(formatDate(startDate));
    const endDate = new Date(roundedStartDate);
    endDate.setDate(endDate.getDate() + 6);
    const today = new Date(formatDate(new Date()));

    // current week
    if (today.getTime() >= roundedStartDate.getTime() && today.getTime() <= endDate.getTime()) {
        return ProgressAchievement.InProgress;
    }
    // previous week
    else if (today.getTime() > roundedStartDate.getTime()) {

        const taskProgress: Array<TaskProgress> = [];

        for (const goal of goalList.goals) {
            if (endDate <= new Date(goal.endDate) && roundedStartDate >= new Date(goal.startDate)) {
                for (const task of goal.tasks) {
                    if (task.completionRate == CompletionRate.Weekly) {
                        let progress = 0;

                        for (const day of Array.from(Array(7).keys())) {
                            const date = new Date(roundedStartDate);
                            date.setDate(date.getDate() + day);

                            const thisDayProgress = progressList[formatDate(date)]?.tasks[task.id];

                            if (thisDayProgress) {
                                progress += thisDayProgress;
                            }
                        }

                        // work out combined progress
                        const expected = isDurationTask(task) ? task.targetDuration : task.targetCount;


                        taskProgress.push({ taskID: task.id, expected, actual: progress });
                    }
                }
            }
        }


        // check if there's uncompleted tasks in this week

        if (taskProgress.length > 0) {
            for (const task of taskProgress) {
                if (task.actual < task.expected) {
                    return ProgressAchievement.NotAchieved;
                }
            }
            return ProgressAchievement.Achieved;
        }

    }

    // future week - no data
    return ProgressAchievement.NoData;
}

/**
 * Obtain your progress on a particular day
 * @param date date to check
 * @param progressList 
 * @param goalList 
 */
export function getDayProgress(date: Date, progressList: ProgressList, goalList: GoalList) {
    const roundedDate = new Date(formatDate(date));
    const today = new Date(formatDate(new Date()));

    // current day
    if (roundedDate.getTime() == today.getTime()) {
        return ProgressAchievement.InProgress;
    }
    // past day
    else if (roundedDate < today) {

        const taskProgress: Array<TaskProgress> = [];

        // check if the day is in the progress list
        for (const goal of goalList.goals) {

            // this date is within the bounds of the goal
            if (roundedDate <= new Date(goal.endDate) && roundedDate >= new Date(goal.startDate)) {
                for (const task of goal.tasks) {
                    if (task.completionRate == CompletionRate.Daily) {
                        const progress = progressList[formatDate(date)]?.tasks[task.id];

                        const expected = isDurationTask(task) ? task.targetDuration : task.targetCount;

                        if (progress) {
                            taskProgress.push({ taskID: task.id, expected, actual: progress });
                        }
                        else {
                            taskProgress.push({ taskID: task.id, expected, actual: 0 });
                        }
                    }
                }
            }
        }

        // check if there's uncompleted tasks in this week

        if (taskProgress.length > 0) {
            for (const task of taskProgress) {
                if (task.actual < task.expected) {
                    return ProgressAchievement.NotAchieved;
                }
            }
            return ProgressAchievement.Achieved;
        }

    }
    // future day - no data
    return ProgressAchievement.NoData;
}

export function achievementColor(progressAchievement: ProgressAchievement) {
    switch (progressAchievement) {
        case ProgressAchievement.NoData:
            return undefined
        case ProgressAchievement.InProgress:
            return "warning";
        case ProgressAchievement.NotAchieved:
            return "danger";
        case ProgressAchievement.Achieved:
            return "success";
    }
}

/**
 * Hashmap of progress for each task
 */
export interface ProgressHash {
    [taskID: number]: number;
}

/**
 * Progress for a specific date
 */
export interface Progress {
    date: string;
    tasks: ProgressHash;
};

/**
 * Entire list of your progress for each day
 */
export interface ProgressList {
    [date: string]: Progress;
};

/**
 * Format a date
 * @param d date
 */
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

/**
 * Return a date formatted so it only shows the year/month
 * @param d date
 */
export function formatMonth(d: Date) {
    let month = '' + (d.getMonth() + 1);
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;

    return [year, month].join('-');
}

/**
 * Check if an argument is a progress list
 * @param arg 
 */
export function isProgressList(arg: any): arg is ProgressList {
    return true;
}