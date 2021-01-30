/**
 * Completion rate for tasks. Can be daily, weekly or monthly.
 */
export enum CompletionRate {
    Daily,
    Weekly,
    Monthly
}

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
    goalCount: number;
    showDetails: boolean;
}

/**
 * A goal. It has a name and a list of tasks you need to achieve for a given timeframe
 */
export interface Goal {
    name: string;
    tasks: Array<DurationTask | CompletionTask>;
}




/**
 * Your list of goals.
 */


export function isGoalList(arg : any): arg is GoalList {
    const goalList: GoalList = arg;

    return goalList.goals instanceof Array;
}


 export interface GoalList {
    goals: Array<Goal>;
}