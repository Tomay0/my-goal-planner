import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonIcon, IonInput, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Goal, DurationTask, Task, CompletionRate } from '../goal';
import { addOutline, closeOutline } from 'ionicons/icons';
import TaskPane from './task-pane';

/**
 * Pane containing one goal
 * @param props goal object
 */
const GoalPane: React.FC<{ goal: Goal, removeGoal: (goal: Goal) => void, update: () => void }> = props => {
    function updateName(name: string) {
        props.goal.name = name;

        props.update();
    }

    // add new task to list of tasks
    function newTask() {
        const task: DurationTask = { name: "New Task", completionRate: CompletionRate.Weekly, targetDuration: 60 };

        props.goal.tasks.push(task);

        props.update();
    }

    // update the task in the list
    function replaceTask(oldTask: Task, task: Task) {
        const index = props.goal.tasks.indexOf(oldTask);

        if (index > -1) {
            props.goal.tasks[index] = task;
        }

        props.update();
    }

    // remove task from list of tasks
    function removeTask(task: Task) {
        const index = props.goal.tasks.indexOf(task);

        if (index > -1) {
            props.goal.tasks.splice(index, 1);
        }

        props.update();
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonToolbar>
                    <IonButtons slot="secondary">
                        <IonButton className="item" onClick={() => { props.removeGoal(props.goal); }}>
                            <IonIcon slot="icon-only" icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        <IonInput value={props.goal.name} placeholder="Enter name"
                            onIonChange={e => { updateName(e.detail.value!); }} />
                    </IonTitle>
                </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
                {
                    props.goal.tasks.map((task: Task, index: number) => (
                        <TaskPane task={task} removeTask={removeTask} replaceTask={replaceTask} update={props.update} key={index} />
                    ))
                }
                <IonButton onClick={newTask}>
                    <IonIcon icon={addOutline} slot='start' />
                    <IonLabel>Add Task</IonLabel>
                </IonButton>
            </IonCardContent>
        </IonCard >
    );
};

export default GoalPane;