import { todayOutline, warning } from 'ionicons/icons';
import { CompletionRate, GoalList, isDurationTask } from './goal';

export type TaskProgress = {
    taskID: number, expected: number, actual: number
}


/**
 * Get a list of tasks and their progress over a month
 * @param startDate 
 * @param progressList 
 * @param goalList 
 */
export function getMonthTaskProgress(startDate: Date, progressList: ProgressList, goalList: GoalList) {
    const roundedStartDate = new Date(formatDate(startDate));
    const endDate = new Date(roundedStartDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    const taskProgress: Array<TaskProgress> = [];

    for (const goal of goalList.goals) {
        if (endDate <= new Date(goal.endDate) && roundedStartDate >= new Date(goal.startDate)) {
            for (const task of goal.tasks) {
                if (task.completionRate == CompletionRate.Monthly) {
                    let progress = 0;

                    for (const day of Array.from(Array(endDate.getDate()).keys())) {
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

    return taskProgress;

}

/**
 * Get a list of tasks and their progress over a week
 * @param startDate 
 * @param progressList 
 * @param goalList 
 */
export function getWeekTaskProgress(startDate: Date, progressList: ProgressList, goalList: GoalList) {
    const roundedStartDate = new Date(formatDate(startDate));
    const endDate = new Date(roundedStartDate);
    endDate.setDate(endDate.getDate() + 6);

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

    return taskProgress;

}

/**
 * Get the list of tasks you have achieved progress on through a given day
 * @param date date
 * @param progressList 
 * @param goalList 
 */
export function getDayTaskProgress(date: Date, progressList: ProgressList, goalList: GoalList) {
    const roundedDate = new Date(formatDate(date));

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

    return taskProgress;
}

/**
 * Get the color of a week/month/day
 * @param startDate 
 * @param endDate 
 * @param progress 
 */
export function getColorOverall(startDate: Date, endDate: Date, progress: Array<TaskProgress>) {
    const startDateRounded = new Date(formatDate(startDate));
    const endDateRounded = new Date(formatDate(endDate));
    const currentDate = new Date(formatDate(new Date()));
    if (currentDate.getTime() < startDateRounded.getTime() || progress.length == 0) {
        return 'light';
    } else if (currentDate.getTime() <= endDateRounded.getTime()) {
        for (const task of progress) {
            if (task.actual < task.expected) return 'warning';

        }

        return 'success';
    } else {
        for (const task of progress) {
            if (task.actual < task.expected) return 'danger';

        }

        return 'success';
    }
}

/**
 * Get the color of a single task progress bar
 * @param startDate 
 * @param endDate 
 * @param task 
 */
export function getColorSingle(startDate: Date, endDate: Date, task: TaskProgress) {
    const currentDate = new Date(formatDate(new Date()));
    if (currentDate.getTime() < startDate.getTime()) {
        return 'light';
    } else if (currentDate.getTime() <= endDate.getTime()) {
        return task.actual < task.expected ? 'warning' : 'success';
    } else {
        return task.actual < task.expected ? 'danger' : 'success';
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