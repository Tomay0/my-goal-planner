/**
 * Completion rate for tasks. Can be daily, weekly or monthly.
 */
enum CompletionRate {
    Daily,
    Weekly,
    Monthly
}

/**
 * Generic task type. Has a name
 */
class Task {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

/**
 * Task based on duration. Required you do a certain amount of this activity either daily, weekly or monthly.
 */
class DurationTask extends Task {
    completionRate: CompletionRate;
    targetDuration: number;

    constructor(name: string, completionRate: CompletionRate, targetDuration: number) {
        super(name);

        this.completionRate = completionRate;
        this.targetDuration = targetDuration;
    }
}

/**
 * A task which requires a certain number of completions. Either monthly or weekly.
 */
class CompletionTask extends Task {
    completionRate: CompletionRate;
    goalCount: number;
    showDetails: boolean;

    constructor(name: string, completionRate: CompletionRate, goalCount: number, showDetails: boolean) {
        super(name);

        this.completionRate = completionRate;
        this.goalCount = goalCount;
        this.showDetails = showDetails;
    }
}

/**
 * A goal. It has a name and a list of tasks you need to achieve for a given timeframe
 */
class Goal {
    name: string;
    tasks: Array<Task>;

    constructor(name: string) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }
}

/**
 * Your list of goals.
 */
class GoalList {
    goals: Array<Goal>;

    constructor() {
        this.goals = [];
    }

    addGoal(goal: Goal) {
        this.goals.push(goal);
    }
}

export default Goal;