import { IonButton, IonContent, IonIcon, IonLabel, IonPage } from '@ionic/react';
import React from 'react';
import { Goal, GoalList, Task } from '../goal';
import { addOutline } from 'ionicons/icons';
import GoalPane from '../components/goal-pane';
import { formatDate } from '../progress';


/**
 * Goal Creator allows you to create and edit your goals
 */
class GoalCreator extends React.Component<{
    goalList: GoalList, updateGoals: (goalList: GoalList) => void
}, { goalList: GoalList }> {

    /**
     * Initialise the goal creator with your goal list
     * @param props contains goal list and a method to update the state
     */
    constructor(props: { goalList: GoalList, updateGoals: (goalList: GoalList) => void }) {
        super(props);

        this.state = { goalList: props.goalList };

        this.newGoal = this.newGoal.bind(this);
        this.removeGoal = this.removeGoal.bind(this);
        this.update = this.update.bind(this);
        this.assignTaskID = this.assignTaskID.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.insertTask = this.insertTask.bind(this);
    }

    /**
     * Create a new goal with an empty list of tasks
     */
    newGoal() {
        const goalList: GoalList = this.state?.goalList;

        const startDate = new Date();
        const endDate = new Date(startDate.getFullYear() + 1, 1, 0);

        const newGoal: Goal = { name: "New Goal", startDate: formatDate(startDate), endDate: formatDate(endDate), tasks: [] };

        goalList.goals.push(newGoal);

        this.setState({ goalList });

        this.props.updateGoals(goalList);
    }

    /**
     * Remove goal
     * @param goal goal to remove 
     */
    removeGoal(goal: Goal) {
        const goalList: GoalList = this.state?.goalList;

        const index = goalList.goals.indexOf(goal);

        if (index > -1) {
            goalList.goals.splice(index, 1);
        }

        this.setState({ goalList });

        this.props.updateGoals(goalList);

        goal.tasks.forEach((task: Task) => this.removeTask(task.id));
    }

    /**
     * Update list of goals
     */
    update() {
        const goalList: GoalList = this.state?.goalList;
        this.setState({ goalList });
        this.props.updateGoals(goalList);
    }


    /**
     * Remove a task from the task map
     */
    removeTask(taskId: number) {
        const goalList: GoalList = this.state?.goalList;

        delete goalList.tasks[taskId];

        this.setState({ goalList });

        this.props.updateGoals(goalList);
    }

    /**
     * Assign a unique ID to a task and add to the map
     * @param task 
     */
    assignTaskID(task: Task) {
        let id: number = Date.now();
        while (id in this.state.goalList.tasks) {
            id++;
        }

        task.id = id;

        const goalList: GoalList = this.state?.goalList;
        goalList.tasks[id] = task;

        this.setState({ goalList });
        this.props.updateGoals(goalList);
    }

    /**
     * Insert new or updated task into dictionary
     * @param task task
     */
    insertTask(task: Task) {
        const goalList: GoalList = this.state?.goalList;
        goalList.tasks[task.id] = task;

        this.setState({ goalList });
        this.props.updateGoals(goalList);
    }

    /**
     * Render the goal creator list
     */
    render() {

        return (
            <IonPage>
                <IonContent>
                    {this.state?.goalList.goals.map((goal: Goal, index: number) => (
                        <GoalPane goal={goal} removeGoal={this.removeGoal} insertTask={this.insertTask}
                            removeTask={this.removeTask} assignTaskID={this.assignTaskID}
                            update={this.update} key={index} />
                    ))}
                    <IonButton expand="block" color="primary" onClick={this.newGoal}>
                        <IonIcon icon={addOutline} slot='start' />
                        <IonLabel>Add Goal</IonLabel>
                    </IonButton>
                </IonContent>



            </IonPage>
        );
    }
}

export default GoalCreator;