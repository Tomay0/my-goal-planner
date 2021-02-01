/**
 * Completion rate for tasks. Can be daily, weekly or monthly.
 */
export enum CompletionRate {
    Daily = 1,
    Weekly = 2,
    Monthly = 3
}

export type Task = DurationTask | CompletionTask;

/**
 * Task based on duration. Required you do a certain amount of this activity either daily, weekly or monthly.
 */
export interface DurationTask {
    name: string;
    completionRate: CompletionRate;
    targetDuration: number;
}

/**
 * A task which requires a certain number of completions. Either monthly or weekly.
 */
export interface CompletionTask {
    name: string;
    completionRate: CompletionRate;
    targetCount: number;
    showDetails: boolean;
}

/**
 * A goal. It has a name and a list of tasks you need to achieve for a given timeframe
 */
export interface Goal {
    name: string;
    tasks: Array<DurationTask | CompletionTask>;
}



export function isCompletionTask(arg: any): arg is CompletionTask {
    const completionTask: CompletionTask = arg;

    return completionTask.hasOwnProperty('name') && completionTask.hasOwnProperty('completionRate') &&
        completionTask.hasOwnProperty('targetCount') && completionTask.hasOwnProperty('showDetails');
}


export function isDurationTask(arg: any): arg is DurationTask {
    const durationTask: DurationTask = arg;

    return durationTask.hasOwnProperty('name') && durationTask.hasOwnProperty('completionRate') &&
        durationTask.hasOwnProperty('targetDuration');
}


/**
 * Your list of goals.
 */


export function isGoalList(arg: any): arg is GoalList {
    const goalList: GoalList = arg;

    return goalList.goals instanceof Array;
}


export interface GoalList {
    goals: Array<Goal>;
}