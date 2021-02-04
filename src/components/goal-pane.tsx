import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonDatetime, IonIcon, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Goal, DurationTask, Task, CompletionRate } from '../goal';
import { addOutline, closeOutline } from 'ionicons/icons';
import TaskPane from './task-pane';
import { formatDate } from '../progress';

/**
 * Pane containing one goal
 * @param props goal object
 */
const GoalPane: React.FC<{ goal: Goal, removeGoal: (goal: Goal) => void, insertTask: (task: Task) => void,
    removeTask: (taskId: number) => void, assignTaskID: (task: Task) => void, update: () => void }> = props => {
    function updateName(name: string) {
        props.goal.name = name;

        props.update();
    }

    // add new task to list of tasks
    function newTask() {
        // note that the ID of '0' will be changed
        const task: DurationTask = { id: 0, name: "New Task", completionRate: CompletionRate.Weekly, targetDuration: 60 };

        props.goal.tasks.push(task);

        props.assignTaskID(task);
    }

    // update the task in the list
    function replaceTask(oldTask: Task, task: Task) {
        const index = props.goal.tasks.indexOf(oldTask);

        if (index > -1) {
            props.goal.tasks[index] = task;
        }
        
        props.insertTask(task);
    }

    // remove task from list of tasks
    function removeTask(task: Task) {
        const index = props.goal.tasks.indexOf(task);

        if (index > -1) {
            props.goal.tasks.splice(index, 1);
        }

        props.removeTask(task.id);
    }

    function setStartDate(date: string) {
        props.goal.startDate = formatDate(new Date(date));

        props.update();
    }

    
    function setEndDate(date: string) {
        props.goal.endDate = formatDate(new Date(date));

        props.update();
    }

    const maxDate = new Date(new Date().getFullYear() + 100, 11, 31);

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
                <IonItem>
                    <IonLabel>Start Date</IonLabel>
                    <IonDatetime displayFormat="YYYY-MM-DD" max={formatDate(maxDate)} 
                    value={props.goal.startDate} onIonChange={e => setStartDate(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel>End Date</IonLabel>
                    <IonDatetime displayFormat="YYYY-MM-DD" max={formatDate(maxDate)} 
                    value={props.goal.endDate} onIonChange={e => setEndDate(e.detail.value!)} />
                </IonItem>
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